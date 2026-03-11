//A BEATRIZ NAO PODE USAR ESSE COMPONENTE

import {
  Switch,
  FormControl,
  FormControlLabel,
  FormHelperText,
  type SxProps,
  type Theme,
} from "@mui/material";

type BaseSwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  size?: "small" | "medium";
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  labelPlacement?: "end" | "start" | "top" | "bottom";
  sx?: SxProps<Theme>;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
};

export default function BaseSwitch({
  value,
  onChange,
  label,
  disabled,
  error,
  helperText,
  required,
  size = "medium",
  color = "primary",
  labelPlacement = "end",
  sx,
  icon,
  checkedIcon,
}: BaseSwitchProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <FormControl error={error} component="fieldset">
      <FormControlLabel
        control={
          <Switch
            checked={value}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            size={size}
            color={color}
            sx={sx}
            icon={icon}
            checkedIcon={checkedIcon}
          />
        }
        label={label}
        labelPlacement={labelPlacement}
      />

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
