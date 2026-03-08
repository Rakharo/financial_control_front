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

export default function Login() {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const { setAuth } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    const result = await loginMutation.mutateAsync(data);

    setAuth(result.user, result.access_token, result.refresh_token);

    navigate("/dashboard");
  }

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 400 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography variant="h5" textAlign="center">
            Login
          </Typography>

          <TextField
            label="Usuário"
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
            onClick={handleSubmit(onSubmit)}
            disabled={loginMutation.isPending}
          >
            Entrar
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
