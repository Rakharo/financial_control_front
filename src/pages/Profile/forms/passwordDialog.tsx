/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Typography } from "@mui/material";
import BaseInput from "../../../components/global/BaseInput";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseForm from "../../../components/global/BaseForm";
import BaseDialog from "../../../components/global/BaseDialog";
import { passwordSchema, type PasswordFormData } from "../utils/passwordSchema";
import { CheckBox, CropSquare } from "@mui/icons-material";

export default function PasswordDialog(props: {
  open: boolean;
  passwordRules: { label: string; test: (v: string) => boolean }[];
  onSubmit: (data: any) => void;
  onClose: () => void;
}) {
  const defaultValues: PasswordFormData = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const novaSenha = form.watch("newPassword", "");
  const matchingPassword: boolean =
    form.watch("confirmPassword", "") === novaSenha ? true : false;

  return (
    <BaseDialog
      open={props.open}
      onClose={props.onClose}
      title="Segurança da conta"
      description="Alteração de senha"
      firstBtnText="Cancelar"
      firstBtnColor="neutral"
      firstBtnVariant="text"
      secondBtnText="Alterar"
      secondBtnColor="primary"
      secondBtnVariant="contained"
      onFirstBtnClick={() => props.onClose()}
      onSecondBtnClick={form.handleSubmit(props.onSubmit)}
    >
      <BaseForm methods={form} onSubmit={form.handleSubmit(props.onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="currentPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <BaseInput
                  {...field}
                  label="Senha"
                  placeholder="Digite sua senha atual"
                  required
                  type="password"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <BaseInput
                  {...field}
                  label="Nova senha"
                  placeholder="Digite uma nova senha"
                  required
                  type="password"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            {/* Regras de senha */}
            <Box sx={{ padding: "1em 0" }}>
              {props.passwordRules.map((rule) => (
                <Box
                  key={rule.label}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {rule.test(novaSenha) ? (
                    <CheckBox color="secondary" />
                  ) : (
                    <CropSquare color="secondary" />
                  )}
                  <Typography>{rule.label}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <BaseInput
                  {...field}
                  label="Confirme a senha"
                  placeholder="Confirme sua nova senha"
                  required
                  type="password"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {matchingPassword ? (
                <CheckBox color="secondary" />
              ) : (
                <CropSquare color="secondary" />
              )}
              <Typography>Senha de confirmação precisa ser idêntica</Typography>
            </Box>
          </Grid>
        </Grid>
      </BaseForm>
    </BaseDialog>
  );
}
