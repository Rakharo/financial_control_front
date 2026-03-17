import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  type SxProps,
  type Theme,
} from "@mui/material";

export default function BaseCheckbox(props: {
  label: string;
  value?: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  sx?: SxProps<Theme>;
}) {
  return (
    <FormControl error={props.error} sx={{ ...props.sx }}>
      <FormControlLabel
        label={props.label}
        control={
          <Checkbox
            checked={!!props.value}
            onChange={(e) => props.onChange(e.target.checked)}
            disabled={props.disabled}
            required={props.required}
            color={props.color || "primary"}
          />
        }
      />
      {props.helperText && (
        <FormHelperText>{props.helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
