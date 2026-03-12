import { Box, Typography } from "@mui/material";
import ErrorOutlineOutlined from "@mui/icons-material/ErrorOutlineOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import BaseDialog from "../global/BaseDialog";

type ConfirmationVariant = "delete" | "warning" | "info";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  highlight?: string;
  description?: string;
  variant?: ConfirmationVariant;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const VARIANT_CONFIG: Record<
  ConfirmationVariant,
  {
    icon: React.ReactElement;
    confirmColor: "error" | "warning" | "info" | "success" | "primary" | "secondary";
    defaultConfirmText: string;
    defaultDescription: string;
  }
> = {
  delete: {
    icon: <ErrorOutlineOutlined color="error" fontSize="large" />,
    confirmColor: "error",
    defaultConfirmText: "Excluir",
    defaultDescription:
      "Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.",
  },
  warning: {
    icon: <WarningAmberOutlined color="warning" fontSize="large" />,
    confirmColor: "primary",
    defaultConfirmText: "Confirmar",
    defaultDescription: "Esta ação requer atenção. Deseja continuar?",
  },
  info: {
    icon: <InfoOutlined color="info" fontSize="large" />,
    confirmColor: "info",
    defaultConfirmText: "Confirmar",
    defaultDescription: "Deseja continuar com esta ação?",
  },
};

export default function ConfirmationDialog({
  open,
  title,
  highlight,
  description,
  variant = "info",
  confirmText,
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <BaseDialog
      open={open}
      onClose={onCancel}
      noColorHeader
      title={
        <Box display="flex" alignItems="center" gap={1}>
          {config.icon}

          <Typography variant="h6">
            {title}
            {highlight && (
              <>
                {" "}
                <Typography
                  component="span"
                  fontWeight="bold"
                  fontStyle="italic"
                >
                  {highlight}
                </Typography>
              </>
            )}
          </Typography>
        </Box>
      }
      description={description ?? config.defaultDescription}
      firstBtnText={cancelText}
      firstBtnColor="neutral"
      firstBtnVariant="text"
      onFirstBtnClick={onCancel}
      secondBtnText={confirmText ?? config.defaultConfirmText}
      secondBtnColor={config.confirmColor}
      secondBtnVariant="contained"
      onSecondBtnClick={onConfirm}
    />
  );
}
