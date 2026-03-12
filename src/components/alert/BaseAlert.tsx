import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import BaseButton from "../global/BaseButton";

export default function BaseAlert(props: {
  open?: boolean;
  title: string;
  description: string;
  horizontalPosition?: "left" | "center" | "right";
  verticalPosition?: "top" | "bottom";
  autoHideDuration?: number;
  actionBtn?: boolean;
  variant?: "filled" | "outlined" | "standard";
  severity?: "error" | "warning" | "info" | "success";
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  const action = (
    <BaseButton
      color="primary"
      size="small"
      onClick={props.onClose ?? handleClose}
      isIconBtn
      icon={<Close fontSize="small" />}
    />
  );
  return (
    <Snackbar
      open={props.open ?? open}
      autoHideDuration={props.autoHideDuration}
      onClose={props.onClose ?? handleClose}
      anchorOrigin={{
        horizontal: props.horizontalPosition || "right",
        vertical: props.verticalPosition || "bottom",
      }}
      sx={{ backgroundColor: "transparent" }}
    >
      <Alert
        severity={props.severity}
        variant={props.variant}
        sx={props.variant === "outlined" ? { bgcolor: "background.paper" } : {}}
        action={props.actionBtn ? action : undefined}
      >
        <AlertTitle>{props.title}</AlertTitle>
        {props.description}
      </Alert>
    </Snackbar>
  );
}
