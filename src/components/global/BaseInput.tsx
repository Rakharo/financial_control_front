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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import BaseButton from "./BaseButton";
import InputMask from "react-input-mask";

export default function BaseInput(props: {
  label?: string;
  value?: string | number;
  onChange?: (value: any) => void;
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
  sx?: React.CSSProperties;
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
              aria-label="toggle password visibility"
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

  // Função para renderizar o TextField, aceitando props extras (como onChange do InputMask)
  const renderTextField = (inputProps: any = {}) => (
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
      // Só passa o onChange se NÃO estiver usando máscara
      onChange={
        props.mask
          ? inputProps.onChange // Vem do InputMask
          : (e) => props.onChange!(e.target.value)
      }
      error={props.error}
      helperText={props.helperText}
      type={inputType}
      slotProps={slotProps}
      disabled={props.disabled}
      multiline={props.multiline}
      minRows={props.minRows}
      maxRows={props.maxRows}
      {...inputProps} // Outros props do InputMask
    />
  );

  // Renderização especial para input file
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
            props.onChange!(file);
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

  return (
    <FormControl fullWidth>
      {props.mask ? (
        <InputMask
          mask={props.mask}
          value={props.value}
          onChange={(e) => props.onChange!(e.target.value)}
          disabled={props.disabled}
        >
          {(inputProps: any) => renderTextField(inputProps)}
        </InputMask>
      ) : (
        renderTextField()
      )}
    </FormControl>
  );
}
