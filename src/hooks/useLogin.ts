import { useMutation } from "@tanstack/react-query";
import type { iLoginRequest } from "../interfaces/LoginInterface";
import { Login } from "../services/LoginService";
import { useAlert } from "../contexts/AlertContext";


export function useLogin() {
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: ({data}: {data: iLoginRequest}) => Login(data),
    onError: (error) => {
      showAlert({
        title: "Erro!",
        description: error.message || "Credencias inválidas!",
        severity: "error",
      });
    }
  });
}