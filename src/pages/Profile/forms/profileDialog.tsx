/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from "@mui/material";
import BaseInput from "../../../components/global/BaseInput";
import { profileSchema, type ProfileFormData } from "../utils/profileSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseForm from "../../../components/global/BaseForm";
import BaseDialog from "../../../components/global/BaseDialog";
import { useEffect } from "react";

export default function ProfileDialog(props: {
  initialData?: any;
  open: boolean;
  onSubmit: (data: any) => void;
  onClose: () => void;
}) {
  const defaultValues: ProfileFormData = {
    name: "",
    email: "",
    login: "",
    ...props.initialData,
  };

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    if (props.open) {
      form.reset({ ...defaultValues, ...props.initialData });
    }
    if (!props.open) {
      form.reset(defaultValues);
    }
  }, [props.open, props.initialData, form]);

  return (
    <BaseDialog
      open={props.open}
      onClose={props.onClose}
      title="Detalhes da conta"
      description="Altere os dados de sua conta"
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
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <BaseInput
                  {...field}
                  label="Nome"
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <BaseInput
                  {...field}
                  label="E-mail"
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="login"
              control={form.control}
              render={({ field, fieldState }) => (
                <BaseInput
                  {...field}
                  label="Login"
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </BaseForm>
    </BaseDialog>
  );
}
