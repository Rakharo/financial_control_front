import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  iGoogleLoginRequest,
  iLoginRequest,
  iLogoutRequest,
  iUpdatePassword,
} from "../interfaces/AuthInterface";
import { LinkWithGoogle, Login, Logout, updatePassword } from "../services/AuthService";
import { useAlert } from "../contexts/AlertContext";

type LoginPayload = iLoginRequest | iGoogleLoginRequest;

export function useLogin() {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: (data: LoginPayload) => Login(data),
    onSuccess: (result) => {
      queryClient.setQueryData(["me"], result.user);
    },
    onError: (error) => {
      showAlert({
        title: "Erro!",
        description: error.message || "Credencias inválidas!",
        severity: "error",
      });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: (data: iLogoutRequest) => Logout(data),
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    onError: (error) => {
      showAlert({
        title: "Erro!",
        description: error.message || "Erro ao sair!",
        severity: "error",
      });
    },
  });
}

export function useLinkWithGoogle() {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: (data: iGoogleLoginRequest) => LinkWithGoogle(data),
    onSuccess: (result) => {
      queryClient.setQueryData(["me"], result.user);
      showAlert({
        title: "Sucesso!",
        description: `Conta vinculada com sucesso!`,
        severity: "success",
      });
    },
    onError: (error) => {
      showAlert({
        title: "Erro!",
        description: error.message || "Erro ao vincular conta!",
        severity: "error",
      });
    },
  });
}


export function usePasswordUpdate() {
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: ({ data }: { data: iUpdatePassword }) => updatePassword(data),
    onSuccess: () => {
      showAlert({
        title: "Sucesso!",
        description: `Senha alterada com sucesso!`,
        severity: "success",
      });
    },
    onError: (error) => {
      showAlert({
        title: "Erro!",
        description: error.message || "Erro ao alterar senha!",
        severity: "error",
      });
    },
  });
}
