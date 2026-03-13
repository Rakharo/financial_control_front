import { FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/pt-br';
import { Dayjs } from "dayjs";

export default function BaseDatePicker(props: {
  label?: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void; // Retorna Dayjs ou null
  placeholder?: string;
  size?: "small" | "medium";
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  minDate?: Dayjs; // Dayjs ou undefined
  maxDate?: Dayjs;
  format?: string; // Ex: "DD/MM/YYYY"
  required?: boolean;
  views?: ("year" | "month" | "day")[];
  width?: string;
}) {
  return (
    <FormControl fullWidth error={props.error} size={props.size}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <DatePicker
          label={props.label}
          value={props.value}
          onChange={props.onChange}
          format={props.format || "DD/MM/YYYY"}
          minDate={props.minDate}
          maxDate={props.maxDate}
          disabled={props.disabled}
          views={props.views || ["day", "month", "year"]}
          sx={(theme) => ({
            backgroundColor: theme.custom.input,
            borderColor: theme.custom.border,
            borderRadius: 1,

            ".MuiPickersOutlinedInput-notchedOutline": {
              borderColor: theme.custom.border,
            },
          })}
          slotProps={{
            textField: {
              variant: "outlined",
              placeholder: props.placeholder,
              error: props.error,
              helperText: props.helperText,
              size: props.size,
              fullWidth: true,
              required: props.required,
              color: props.error ? "error" : "primary",
              sx: { width: props.width || 220 },
            },
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
