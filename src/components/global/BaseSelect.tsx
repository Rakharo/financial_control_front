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
} from "@mui/material";
import BaseButton from "./BaseButton";

export default function BaseSelect(props: {
  value: any | any[];
  label?: string;
  onChange: (value: any | any[]) => void;
  options: any[];
  multi?: boolean;
  disabled?: boolean;
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => string | number;
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
  const handleChange = (event: any) => {
    props.onChange(event.target.value);
  };

  // Para MultiSelect, o 'value' deve ser array
  const isSelected = (option: any) => {
    if (props.multi && Array.isArray(props.value)) {
      return props.value.indexOf(props.getOptionValue(option)) > -1;
    }
    return props.getOptionValue(props.value) === props.getOptionValue(option);
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
        input={
          <OutlinedInput
            id="select-multiple-chip"
            label={props.label}
            color={props.color || "primary"}
          />
        }
        renderValue={(selected) => {
          if (props.multi && Array.isArray(selected)) {
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((val) => {
                  const option = props.options.find(
                    (opt) => props.getOptionValue(opt) === val
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
            (opt) => props.getOptionValue(opt) === selected
          );
          return option ? props.getOptionLabel(option) : selected;
        }}
      >
        {/* Se customButtonOption existir, renderiza como primeira opção */}
        {props.customButtonOption && (
          <MenuItem
            key="custom-button-option"
            value="" // valor vazio para não alterar o select
            // disabled // impede seleção pelo select
            {...props.customButtonOption.menuItemProps}
            style={{
              justifyContent: "center",
              ...props.customButtonOption.menuItemProps?.style,
            }}
          >
            <BaseButton {...props.customButtonOption.buttonProps} fullWidth />
          </MenuItem>
        )}

        {props.options.map((option) => {
          const optionValue = props.getOptionValue(option);
          return (
            <MenuItem key={optionValue} value={optionValue}>
              {props.multi && <Checkbox checked={isSelected(option)} />}
              {props.getOptionLabel ? props.getOptionLabel(option) : option}
            </MenuItem>
          );
        })}
      </Select>
      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
    </FormControl>
  );
}
