import { useNavigate } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "../../../hooks/useLogin";
import { useUser } from "../../../contexts/UserContext";
import { type LoginFormData, loginSchema } from "../utils/loginSchema";
import { useAlert } from "../../../contexts/AlertContext";
import BaseForm from "../../../components/global/BaseForm";
import BaseInput from "../../../components/global/BaseInput";
import { Box } from "@mui/material";
import BaseButton from "../../../components/global/BaseButton";

export default function LoginTab(props: { defaultLogin: string }) {
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
    try{
        const result = await loginMutation.mutateAsync(
          { data: data },
          {
            onSuccess: () => {
              navigate("/dashboard");
    
              showAlert({
                title: "Login realizado com sucesso!",
                description: `Bem vindo(a), ${result.user.name}`,
                severity: "success",
              });
              setAuth(result.access_token, result.refresh_token);
            },
          },
        );

    } catch (error) {
        console.error(error)
    }
  }

  return (
    <>
      <Box
        sx={{
          border: "1px solid rgba(255,255,255,0.2)",
          padding: 2,
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <BaseForm methods={form} onSubmit={form.handleSubmit(onSubmit)}>
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
        </BaseForm>

        <BaseButton
          btnText="Entrar"
          onClick={form.handleSubmit(onSubmit)}
          disabled={loginMutation.isPending}
          sx={{ alignSelf: "flex-end" }}
        />
      </Box>
    </>
  );
}
