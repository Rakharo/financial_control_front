import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { iLoginRequest } from "../interfaces/LoginInterface";
import { Login } from "../services/LoginService";
import { useAlert } from "../contexts/AlertContext";

export function useLogin() {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: ({ data }: { data: iLoginRequest }) => Login(data),
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
