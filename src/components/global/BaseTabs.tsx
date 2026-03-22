/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Tabs, Tab, Box, type SxProps, type Theme } from "@mui/material";
import BaseButton from "./BaseButton";
import BaseTooltip from "./BaseTooltip";

export default function BaseTabs(props: {
  value?: string | number;
  onChangeTab?: (value: string | number) => void;

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
    tab: any,
  ) => void | Promise<void>;
}) {
  const isVertical = props.orientation === "vertical";

  const initialIndex = props.initialValue
    ? props.tabs.findIndex((tab) => tab.value === props.initialValue)
    : 0;

  const isControlled = props.value !== undefined;

  const [internalIndex, setInternalIndex] = useState(initialIndex);

  const tabIndex = isControlled
    ? props.tabs.findIndex((tab) => tab.value === props.value)
    : internalIndex;

  const currentTab = props.tabs[tabIndex];

  const handleChange = async (
    _: React.SyntheticEvent,
    newValue: string | number,
  ) => {
    const nextIndex = props.tabs.findIndex((tab) => tab.value === newValue);

    if (props.onChange) {
      await props.onChange(tabIndex, nextIndex, props.tabs[nextIndex]);
    }

    if (props.onChangeTab) {
      props.onChangeTab(newValue);
    }

    if (!isControlled) {
      setInternalIndex(nextIndex);
    }
  };

  const handlePrev = async () => {
    if (props.onPrev) await props.onPrev(tabIndex, currentTab);

    if (tabIndex > 0) {
      const newValue = props.tabs[tabIndex - 1].value;

      if (props.onChangeTab) props.onChangeTab(newValue);
      if (!isControlled) setInternalIndex(tabIndex - 1);
    }
  };

  const handleNext = async () => {
    if (props.onNext) await props.onNext(tabIndex, currentTab);

    if (tabIndex < props.tabs.length - 1) {
      const newValue = props.tabs[tabIndex + 1].value;

      if (props.onChangeTab) props.onChangeTab(newValue);
      if (!isControlled) setInternalIndex(tabIndex + 1);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: isVertical ? "row" : "column",
      }}
    >
      <Tabs
        value={currentTab?.value}
        onChange={handleChange}
        variant={props.variant || "fullWidth"}
        orientation={props.orientation || "horizontal"}
        scrollButtons={props.scrollButtons}
        sx={{
          ...props.sx,
          backgroundColor: "background.paper",
          borderRadius: "1rem",
          minWidth: isVertical ? 220 : "auto",
          mb: !isVertical ? 2 : 0,
        }}
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
              sx={{
                textTransform: "none",
                fontWeight: 500,
              }}
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

      <Box
        sx={{
          flex: 1,
          ml: isVertical ? 2 : 0,
          mt: !isVertical ? 1 : 0,
          minHeight: 420,
          transition: "all 0.25s ease",
        }}
      >
        {currentTab?.render()}

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
