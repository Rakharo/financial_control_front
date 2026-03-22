/* eslint-disable react-hooks/refs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import BaseButton from "./BaseButton";
import { IMaskInput } from "react-imask";

export default function BaseInput(props: {
  label?: string;
  value?: string | number;
  onChange?: (value: any) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  placeholder?: string;
  size?: "small" | "medium";
  error?: boolean;
  helperText?: string;
  type?: string;
  fileType?: string;
  mask?: string;
  disabled?: boolean;
  required?: boolean;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  slotProps?: {
    input?: any;
    inputLabel?: any;
  };
  sx?: SxProps<Theme>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = props.type === "password";
  const isFile = props.type === "file";

  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : props.type;

  const [selectedFileName, setSelectedFileName] = useState("");

  const slotProps = {
    inputLabel: props.slotProps?.inputLabel,
    input: {
      ...props.slotProps?.input,
      ...(isPassword && {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((show) => !show)}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOff fontSize="small" color="primary" />
              ) : (
                <Visibility fontSize="small" color="primary" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }),
    },
  };

  //Com máscara (IMask)
  if (props.mask) {
    return (
      <FormControl fullWidth>
        <TextField
          fullWidth
          sx={{ ...props.sx }}
          size={props.size || "medium"}
          value={props.value || ""}
          label={props.label}
          placeholder={props.placeholder}
          required={props.required}
          variant="outlined"
          color={props.color || "primary"}
          error={props.error}
          helperText={props.helperText}
          type={inputType}
          disabled={props.disabled}
          multiline={props.multiline}
          minRows={props.minRows}
          maxRows={props.maxRows}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          slotProps={{
            ...slotProps,
            inputLabel: {
              ...props.slotProps?.inputLabel,
              shrink: Boolean(props.value && props.value.toString().length > 0),
            },
            input: {
              ...slotProps.input,
              inputComponent: IMaskInput as any,
              inputProps: {
                mask: props.mask,
                onAccept: (value: unknown) => {
                  props.onChange?.(String(value));
                },
                overwrite: true,
              },
            },
          }}
        />
      </FormControl>
    );
  }

  //File input
  if (isFile) {
    return (
      <FormControl fullWidth>
        <input
          accept={props.fileType || "*"}
          style={{ display: "none" }}
          id={`base-input-file-${props.label}`}
          type="file"
          ref={props.inputRef}
          disabled={props.disabled}
          required={props.required}
          onChange={(e) => {
            const file = e.target.files?.[0];
            setSelectedFileName(file ? file.name : "");
            props.onChange?.(file);
          }}
        />
        <label htmlFor={`base-input-file-${props.label}`}>
          <BaseButton
            variant="contained"
            color="secondary"
            component="span"
            disabled={props.disabled}
            fullWidth
            btnText={props.label || "Selecionar arquivo"}
          />
        </label>
        {selectedFileName && (
          <Box mt={1}>
            <Typography variant="body2">{selectedFileName}</Typography>
          </Box>
        )}
        {props.helperText && (
          <Typography
            variant="caption"
            color={props.error ? "error" : "textSecondary"}
          >
            {props.helperText}
          </Typography>
        )}
      </FormControl>
    );
  }

  //Input normal (sem máscara)
  return (
    <FormControl fullWidth>
      <TextField
        fullWidth
        sx={{ ...props.sx }}
        size={props.size || "medium"}
        value={props.value || ""}
        label={props.label}
        placeholder={props.placeholder}
        required={props.required}
        variant="outlined"
        color={props.color || "primary"}
        onChange={(e) => props.onChange?.(e.target.value)}
        error={props.error}
        helperText={props.helperText}
        type={inputType}
        slotProps={slotProps}
        disabled={props.disabled}
        multiline={props.multiline}
        minRows={props.minRows}
        maxRows={props.maxRows}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
    </FormControl>
  );
}
