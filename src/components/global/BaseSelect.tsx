/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  MenuItem,
  Checkbox,
  InputLabel,
  FormControl,
  Box,
  Chip,
  OutlinedInput,
  FormHelperText,
  ListSubheader,
  Divider,
  TextField,
} from "@mui/material";
import { useState, useMemo } from "react";
import BaseButton from "./BaseButton";
import React from "react";

export default function BaseSelect(props: {
  value: any | any[];
  label?: string;
  onChange: (value: any | any[]) => void;
  options: any[];
  multi?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => string | number;
  groupBy?: (option: any) => string;
  error?: boolean;
  helperText?: string;
  size?: "small" | "medium";
  required?: boolean;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  sx?: React.CSSProperties;
  customButtonOption?: {
    buttonProps: React.ComponentProps<typeof BaseButton>;
    menuItemProps?: React.ComponentProps<typeof MenuItem>;
  };
}) {
  const [search, setSearch] = useState("");

  const handleChange = (event: any) => {
    props.onChange(event.target.value);
  };

  const isSelected = (option: any) => {
    if (props.multi && Array.isArray(props.value)) {
      return props.value.includes(props.getOptionValue(option));
    }

    return props.value === props.getOptionValue(option);
  };

  function normalizeString(value: string) {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  const filteredOptions = useMemo(() => {
    if (!props.searchable || !search) return props.options;

    return props.options.filter((option) =>
      normalizeString(props.getOptionLabel(option)).includes(
        normalizeString(search),
      ),
    );
  }, [search, props.options]);

  const groupedOptions = props.groupBy
    ? filteredOptions.reduce((acc: Record<string, any[]>, option) => {
        const group = props.groupBy!(option) || "Outros";
        if (!acc[group]) acc[group] = [];
        acc[group].push(option);
        return acc;
      }, {})
    : { options: filteredOptions };

  const renderOption = (option: any) => {
    const optionValue = props.getOptionValue(option);

    return (
      <MenuItem key={optionValue} value={optionValue}>
        {props.multi && <Checkbox checked={isSelected(option)} />}
        {props.getOptionLabel(option)}
      </MenuItem>
    );
  };

  return (
    <FormControl fullWidth error={props.error} size={props.size || "medium"}>
      {props.label && (
        <InputLabel required={props.required} color={props.color || "primary"}>
          {props.label}
        </InputLabel>
      )}

      <Select
        multiple={props.multi}
        value={props.value}
        onChange={handleChange}
        label={props.label}
        disabled={props.disabled}
        required={props.required}
        sx={{ ...props.sx }}
        input={<OutlinedInput label={props.label} />}
        MenuProps={{
          PaperProps: {
            style: { maxHeight: 400 },
          },
        }}
        renderValue={(selected) => {
          if (props.multi && Array.isArray(selected)) {
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((val) => {
                  const option = props.options.find(
                    (opt) => props.getOptionValue(opt) === val,
                  );
                  return (
                    <Chip
                      key={val}
                      label={option ? props.getOptionLabel(option) : val}
                    />
                  );
                })}
              </Box>
            );
          }

          const option = props.options.find(
            (opt) => props.getOptionValue(opt) === selected,
          );

          return option ? props.getOptionLabel(option) : selected;
        }}
      >
        {/* SEARCH */}
        {props.searchable && (
          <ListSubheader>
            <TextField
              size="small"
              placeholder="Buscar..."
              fullWidth
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
            />
          </ListSubheader>
        )}

        {/* BOTÃO CUSTOM */}
        {props.customButtonOption && (
          <MenuItem
            key="custom-button-option"
            value=""
            {...props.customButtonOption.menuItemProps}
            style={{
              justifyContent: "center",
              ...props.customButtonOption.menuItemProps?.style,
            }}
          >
            <BaseButton {...props.customButtonOption.buttonProps} fullWidth />
          </MenuItem>
        )}

        {/* OPTIONS */}
        {Object.entries(groupedOptions).flatMap(([group, options], index) => {
          const elements: any[] = [];

          if (props.groupBy) {
            if (index > 0) {
              elements.push(<Divider key={`${group}-divider`} />);
            }

            elements.push(
              <ListSubheader key={`${group}-header`}>{group}</ListSubheader>,
            );
          }

          options.forEach((option) => {
            elements.push(renderOption(option));
          });

          return elements;
        })}
      </Select>

      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
    </FormControl>
  );
}
