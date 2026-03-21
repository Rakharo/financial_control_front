/* eslint-disable react-hooks/incompatible-library */

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseForm from "../../../components/global/BaseForm";
import BaseInput from "../../../components/global/BaseInput";
import { signUpSchema, type SignUpFormData } from "../utils/signUpSchema";
import { Box, Collapse, Typography } from "@mui/material";
import { CheckBox, CropSquare } from "@mui/icons-material";
import BaseButton from "../../../components/global/BaseButton";
import { useCreateUser } from "../../../hooks/useUser";
import { GoogleLogin } from "@react-oauth/google";
import { useAlert } from "../../../contexts/AlertContext";

export default function SignUpTab(props: {
  goToLogin: () => void;
  onSuccess: (login: string) => void;
  onGoogleLogin: (credential: string) => void;
  isGoogleLoading: boolean;
}) {
  const { showAlert } = useAlert();
  const createUser = useCreateUser();

  const defaultValues: SignUpFormData = {
    name: "",
    email: "",
    login: "",
    password: "",
    // confirmPassword: "",
  };

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
    mode: "onSubmit",
  });

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
            props.onSuccess(data.login);
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

//   function handleCancelSignUp() {
//     form.reset(defaultValues);
//     props.goToLogin();
//   }

  return (
    <>
      <Box
        sx={{
          border: "1px solid rgba(255,255,255,0.2)",
          padding: 2,
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 2,
          minHeight: 420
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
            name="login"
            control={form.control}
            render={({ field, fieldState }) => (
              <BaseInput
                {...field}
                label="Login"
                placeholder="Digite um nome de usuário"
                required
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
              />
            )}
          />

          {/* Regras de senha */}
          <Collapse in={password !== ""}>
            <Box>
              {passwordRules.map((rule) => (
                <Box
                  key={rule.label}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {rule.test(password) ? (
                    <CheckBox color="secondary" />
                  ) : (
                    <CropSquare color="secondary" />
                  )}
                  <Typography>{rule.label}</Typography>
                </Box>
              ))}
            </Box>
          </Collapse>
        </BaseForm>
        
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <BaseButton
            btnText="Criar conta"
            onClick={form.handleSubmit(onSubmit)}
            disabled={props.isGoogleLoading}
          />

          <Typography sx={{ textAlign: "center", opacity: 0.6, fontSize: 14 }}>
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
                    severity: "error"
                })
              }}
              useOneTap={false}
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
              width="100%"
            />
          )}
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: form.watch("password", "") !== "" ? 2 : 0,
          }}
        >
          <BaseButton btnText="Cancelar" color="neutral" variant="outlined" onClick={handleCancelSignUp} />
          <BaseButton
            btnText="Criar conta"
            onClick={form.handleSubmit(onSubmit)}
          />
        </Box> */}
      </Box>
    </>
  );
}
