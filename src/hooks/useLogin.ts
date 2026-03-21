import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { iGoogleLoginRequest, iLoginRequest } from "../interfaces/LoginInterface";
import { Login } from "../services/LoginService";
import { useAlert } from "../contexts/AlertContext";

type LoginPayload = iLoginRequest | iGoogleLoginRequest;


export function useLogin() {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: (data: LoginPayload ) => Login(data),
    onSuccess: (result) => {
      queryClient.setQueryData(["me"], result.user);
    },
    onError: (error) => {
      showAlert({
        title: "Erro!",
        description: error.message  || "Credencias inválidas!",
        severity: "error",
      });
    },
  });
}
