import { useMutation } from "@tanstack/react-query";
import type { iLoginRequest } from "../interfaces/LoginInterface";
import { Login } from "../services/LoginService";


export function useLogin() {
  return useMutation({
    mutationFn: (data: iLoginRequest) => Login(data),
  });
}