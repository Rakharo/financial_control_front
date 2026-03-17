/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Tabs, Tab, Box, type SxProps, type Theme } from "@mui/material";
import BaseButton from "./BaseButton";
import BaseTooltip from "./BaseTooltip";

export default function BaseTabs(props: {
  initialValue?: string | number;
  sx?: SxProps<Theme>;
  variant?: "fullWidth" | "scrollable" | "standard";
  orientation?: "horizontal" | "vertical";
  scrollButtons?: boolean;
  firstBtnText?: string;
  firstBtnColor?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  firstBtnVariant?: "contained" | "outlined" | "text";
  secondBtnText?: string;
  secondBtnColor?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  secondBtnVariant?: "contained" | "outlined" | "text";
  tabs: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactElement;
    disabled?: boolean;
    tooltipText?: string;
    render: () => React.ReactNode;
  }>;
  onPrev?: (currentIndex: number, data?: any) => Promise<void> | void;
  onNext?: (currentIndex: number, data?: any) => Promise<void> | void;
  onChange?: (
    currentIndex: number,
    nextIndex: number,
    tab: any
  ) => void | Promise<void>;
}) {
  // Encontra o índice inicial baseado no initialValue
  const initialIndex = props.initialValue
    ? props.tabs.findIndex((tab) => tab.value === props.initialValue)
    : 0;

  const [tabIndex, setTabIndex] = useState(initialIndex);

  const handleChange = async (
    _: React.SyntheticEvent,
    newValue: string | number
  ) => {
    const nextIndex = props.tabs.findIndex((tab) => tab.value === newValue);

    if (props.onChange) {
      await props.onChange(tabIndex, nextIndex, props.tabs[nextIndex]);
    }

    setTabIndex(nextIndex);
  };

  // Funções para navegação com callback
  const handlePrev = async () => {
    if (props.onPrev) await props.onPrev(tabIndex, props.tabs[tabIndex]);
    if (tabIndex > 0) setTabIndex(tabIndex - 1);
  };
  const handleNext = async () => {
    if (props.onNext) await props.onNext(tabIndex, props.tabs[tabIndex]);
    if (tabIndex < props.tabs.length - 1) setTabIndex(tabIndex + 1);
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Tabs
        value={props.tabs[tabIndex].value}
        onChange={handleChange}
        variant={props.variant || "fullWidth"}
        orientation={props.orientation || "horizontal"}
        scrollButtons={props.scrollButtons}
        sx={{ ...props.sx, backgroundColor: "background.paper", borderRadius: "1rem" }}
      >
        {props.tabs.map((tab) => {
          const tabComponent = (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              icon={tab.icon}
              iconPosition="start"
              disabled={tab.disabled}
            />
          );

          
          if (tab.disabled && tab.tooltipText) {
            return (
              <BaseTooltip key={tab.value} content={tab.tooltipText} arrow>
                <span style={{ display: "inline-flex" }}>{tabComponent}</span>
              </BaseTooltip>
            );
          }

          return tabComponent;
        })}
      </Tabs>
      <Box mt={2}>
        {props.tabs[tabIndex].render()}
        {props.scrollButtons && (
          <Box display="flex" justifyContent="space-between" mt={2}>
            <BaseButton
              onClick={handlePrev}
              disabled={tabIndex === 0}
              btnText={props.firstBtnText || "Anterior"}
              color={props.firstBtnColor || "secondary"}
              variant={props.firstBtnVariant || "outlined"}
            />
            <BaseButton
              onClick={handleNext}
              disabled={tabIndex === props.tabs.length - 1}
              btnText={props.secondBtnText || "Próximo"}
              color={props.secondBtnColor || "primary"}
              variant={props.secondBtnVariant || "contained"}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
