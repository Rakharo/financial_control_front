import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "../../hooks/useLogin";
import { useUser } from "../../contexts/UserContext";
import { type LoginFormData, loginSchema } from "./utils/loginSchema";
import { useAlert } from "../../contexts/AlertContext";

export default function Login() {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const { setAuth } = useUser();
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
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
        },
      },
    );

    setAuth(result.user, result.access_token, result.refresh_token);
  }

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", maxWidth: 400 }}
      >
        <Card sx={{ width: "100%", maxWidth: 400 }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <Typography variant="h5" textAlign="center">
              Login
            </Typography>

            <TextField
              label="Usuário"
              autoFocus
              {...register("login")}
              error={!!errors.login}
              helperText={errors.login?.message}
            />

            <TextField
              label="Senha"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              variant="contained"
              type="submit"
              disabled={loginMutation.isPending}
            >
              Entrar
            </Button>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
}
