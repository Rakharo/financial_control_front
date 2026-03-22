/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/incompatible-library */

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseForm from "../../../components/global/BaseForm";
import BaseInput from "../../../components/global/BaseInput";
import { signUpSchema, type SignUpFormData } from "../utils/signUpSchema";
import {
  Box,
  Paper,
  Popper,
  Portal,
  Typography,
} from "@mui/material";
import { CheckBox, CropSquare } from "@mui/icons-material";
import BaseButton from "../../../components/global/BaseButton";
import { useCreateUser } from "../../../hooks/useUser";
import { GoogleLogin } from "@react-oauth/google";
import { useAlert } from "../../../contexts/AlertContext";
import { useState } from "react";

export default function SignUpTab(props: {
  goToLogin: () => void;
  onSuccess: (login: string) => void;
  onGoogleLogin: (credential: string) => void;
  isGoogleLoading: boolean;
}) {
  const { showAlert } = useAlert();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const createUser = useCreateUser();

  const defaultValues: SignUpFormData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    // confirmPassword: "",
  };

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleBlur = () => {
    // pequeno delay pra permitir interação suave
    setTimeout(() => setAnchorEl(null), 100);
  };

  const open = Boolean(anchorEl);

  const password = form.watch("password", "");

  const passwordRules = [
    { label: "Pelo menos 8 caracteres", test: (v: string) => v.length >= 8 },
    {
      label: "Pelo menos uma letra maiúscula",
      test: (v: string) => /[A-Z]/.test(v),
    },
    {
      label: "Pelo menos uma letra minúscula",
      test: (v: string) => /[a-z]/.test(v),
    },
    { label: "Pelo menos um número", test: (v: string) => /\d/.test(v) },
    {
      label: "Pelo menos um caractere especial (@,$,&, etc)",
      test: (v: string) => /[^A-Za-z0-9]/.test(v),
    },
  ];

  function onSubmit(data: SignUpFormData) {
    try {
      createUser.mutate(
        { data: data },
        {
          onSuccess: () => {
            form.reset(defaultValues);
            props.goToLogin();
            props.onSuccess(data.email);
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 1,
          gap: 2,
          height: 420,
        }}
      >
        <BaseForm methods={form} onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <BaseInput
                {...field}
                label="Nome"
                placeholder="Digite seu nome completo"
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <BaseInput
                {...field}
                label="E-mail"
                placeholder="Digite seu melhor e-mail"
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <BaseInput
                {...field}
                label="Telefone"
                placeholder="Digite seu número de celular"
                mask="(00) 00000-0000"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <BaseInput
                {...field}
                label="Senha"
                type="password"
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onFocus={(e) => handleFocus(e)}
                onBlur={() => {
                  field.onBlur();
                  handleBlur();
                }}
              />
            )}
          />

          {/* Regras de senha */}
          <Portal>
            <Popper
              open={open}
              anchorEl={anchorEl}
              placement="bottom-start"
              {...({ strategy: "fixed" } as any)}
              sx={{
                zIndex: 9999,
                position: "fixed !important",
              }}
            >
              <Paper
                sx={{ p: 2, mt: 1, minWidth: 250, boxShadow: 3 }}
              >
                {passwordRules.map((rule) => (
                  <Box
                    key={rule.label}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    {rule.test(password) ? (
                      <CheckBox color="secondary" />
                    ) : (
                      <CropSquare color="secondary" />
                    )}
                    <Typography variant="body2">{rule.label}</Typography>
                  </Box>
                ))}
              </Paper>
            </Popper>
          </Portal>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <BaseButton
              btnText="Criar conta"
              type="submit"
              disabled={props.isGoogleLoading}
            />

            <Typography
              sx={{ textAlign: "center", opacity: 0.6, fontSize: 14 }}
            >
              ou continue com
            </Typography>

            {!props.isGoogleLoading && (
              <GoogleLogin
                onSuccess={(res) => {
                  if (res.credential) {
                    props.onGoogleLogin(res.credential);
                  }
                }}
                onError={() => {
                  showAlert({
                    title: "Erro!",
                    description: "Erro ao autenticar com Google",
                    severity: "error",
                  });
                }}
                useOneTap={false}
                theme="outline"
                size="large"
                text="continue_with"
                shape="pill"
                width="100%"
              />
            )}
          </Box>
        </BaseForm>
      </Box>
    </>
  );
}
