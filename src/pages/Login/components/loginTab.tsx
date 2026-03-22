import { useNavigate } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "../../../hooks/useAuth";
import { useUser } from "../../../contexts/UserContext";
import { type LoginFormData, loginSchema } from "../utils/loginSchema";
import { useAlert } from "../../../contexts/AlertContext";
import BaseForm from "../../../components/global/BaseForm";
import BaseInput from "../../../components/global/BaseInput";
import { Box, Typography } from "@mui/material";
import BaseButton from "../../../components/global/BaseButton";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginTab(props: {
  defaultLogin: string;
  onGoogleLogin: (credential: string) => void;
}) {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const { setAuth } = useUser();
  const { showAlert } = useAlert();

  const defaultValues = {
    login: props.defaultLogin || "",
    password: "",
  };

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: "onSubmit",
  });

  async function onSubmit(data: LoginFormData) {
    try {
      const result = await loginMutation.mutateAsync(data);

      setAuth(result.access_token, result.refresh_token);

      navigate("/dashboard");

      showAlert({
        title: "Login realizado com sucesso!",
        description: `Bem vindo(a), ${result.user.name}`,
        severity: "success",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Box
        sx={{
          padding: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minHeight: 420,
        }}
      >
        <BaseForm methods={form} onSubmit={form.handleSubmit(onSubmit)}>
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: "5em !important"}}>
            <BaseButton
              btnText="Entrar"
              type="submit"
              disabled={loginMutation.isPending}
            />

            <Typography
              sx={{ textAlign: "center", opacity: 0.6, fontSize: 14 }}
            >
              ou continue com
            </Typography>

            {!loginMutation.isPending && (
              <GoogleLogin
                onSuccess={(res) => {
                  if (res.credential) {
                    props.onGoogleLogin(res.credential);
                  }
                }}
                onError={() => {
                  console.log("Erro no login com Google");
                }}
                useOneTap={false}
                theme="outline"
                size="large"
                text="signin_with"
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
