import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BaseButton from "./BaseButton";

export default function BaseDialog(props: {
  children?: React.ReactNode;
  title?: string | React.ReactElement;
  description?: string | React.ReactElement;
  open: boolean;
  showCloseIcon?: boolean;
  hideFirstBtn?: boolean;
  hideSecondBtn?: boolean;
  firstBtnText?: string;
  firstBtnType?: "button" | "submit" | "reset";
  firstBtnVariant?: "contained" | "outlined" | "text";
  firstBtnColor?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "neutral";
  secondBtnText?: string;
  secondBtnType?: "button" | "submit" | "reset";
  secondBtnVariant?: "contained" | "outlined" | "text";
  secondBtnColor?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "neutral";
  width?: "xs" | "sm" | "md" | "lg" | "xl";
  sx?: React.CSSProperties;
  noColorHeader?: boolean;
  hideDefaultActions?: boolean;
  disableBackdropClose?: boolean;
  disableEscapeClose?: boolean;
  onFirstBtnClick?: () => void;
  onSecondBtnClick?: () => void;
  onClose?: () => void;
}) {
  return (
    <Dialog
      open={props.open}
      onClose={(_, reason) => {
        if (
          (reason === "backdropClick" &&
            props.disableBackdropClose !== false) ||
          (reason === "escapeKeyDown" && props.disableEscapeClose)
        ) {
          return;
        }

        props.onClose?.();
      }}
      fullWidth
      maxWidth={props.width || "sm"}
      sx={{ ...props.sx }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: props.noColorHeader ? "" : "primary.main",
          color: props.noColorHeader ? "" : "white",
          // marginBottom: '2em'
        }}
      >
        <Box>
          <span>{props.title}</span>
          {props.description && (
            <DialogContentText
              sx={{ color: props.noColorHeader ? "" : "white" }}
            >
              {props.description}
            </DialogContentText>
          )}
        </Box>
        {props.showCloseIcon && (
          <BaseButton
            isIconBtn
            icon={<CloseIcon />}
            onClick={props.onClose}
            color="info"
          />
        )}
      </DialogTitle>
      <DialogContent sx={{ paddingTop: "20px !important" }}>
        {props.children}
      </DialogContent>
      {!props.hideDefaultActions && (
        <DialogActions>
          {!props.hideFirstBtn && (
            <BaseButton
              btnText={props.firstBtnText}
              onClick={props.onFirstBtnClick}
              variant={props.firstBtnVariant}
              color={props.firstBtnColor}
              type={props.firstBtnType}
            />
          )}
          {!props.hideSecondBtn && (
            <BaseButton
              btnText={props.secondBtnText}
              onClick={props.onSecondBtnClick}
              variant={props.secondBtnVariant}
              color={props.secondBtnColor}
              type={props.secondBtnType || "submit"}
            />
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}
