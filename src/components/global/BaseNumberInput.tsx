import { TextField, FormControl } from "@mui/material";

interface BaseNumberInputProps {
  label?: string;
  value?: number | null;
  onChange: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  size?: "small" | "medium";
  sx?: React.CSSProperties;
}

export default function BaseNumberInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  required,
  disabled,
  error,
  helperText,
  size = "medium",
  sx,
}: BaseNumberInputProps) {
  return (
    <FormControl fullWidth>
      <TextField
        fullWidth
        type="number"
        label={label}
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value === "" ? null : Number(e.target.value))
        }
        slotProps={{
          htmlInput: {
            min: min,
            max: max,
            step: step
          },
        }}
        required={required}
        disabled={disabled}
        error={error}
        helperText={helperText}
        size={size}
        sx={sx}
      />
    </FormControl>
  );
}
