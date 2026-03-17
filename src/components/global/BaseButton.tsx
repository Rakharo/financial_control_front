import React from "react";
import { Button, IconButton, type SxProps, type Theme } from "@mui/material";

type BaseButtonProps = {
  type?: "button" | "submit" | "reset";
  btnText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "neutral";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  isIconBtn?: boolean;
  icon?: React.ReactNode;
  component?: string;
  sx?: SxProps<Theme>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & React.ComponentPropsWithoutRef<"button">; // Para aceitar outras props do Button/IconButton

const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  (props, ref) => {
    const {
      type,
      btnText,
      startIcon,
      endIcon,
      variant,
      color,
      size,
      fullWidth,
      disabled,
      loading,
      isIconBtn,
      icon,
      sx,
      component,
      onClick,
      ...rest // prop necessária para repassar as outras props ao Button/IconButton para funcionamento correto do ToolTip
    } = props;

    return isIconBtn ? (
      <IconButton
        ref={ref}
        size={size || "medium"}
        color={color || "primary"}
        onClick={onClick}
        disabled={disabled || loading}
        sx={{...sx}}
        {...rest}
      >
        {icon}
      </IconButton>
    ) : (
      <Button
        ref={ref}
        type={type || "button"}
        variant={variant || "contained"}
        color={color || "primary"}
        size={size || "medium"}
        fullWidth={fullWidth || false}
        disabled={disabled || loading}
        onClick={onClick}
        startIcon={startIcon}
        endIcon={endIcon}
        component={component as React.ElementType}
        sx={{ textTransform: "none", ...sx }}
        {...rest}
      >
        {btnText}
      </Button>
    );
  }
);

export default BaseButton;