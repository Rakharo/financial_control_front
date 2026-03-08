import { useMutation } from "@tanstack/react-query";
import { api } from "../api/axios";
import type { iLoginRequest, iLoginResponse } from "../interfaces/LoginInterface";


export function useLogin() {
  return useMutation({
    mutationFn: async (data: iLoginRequest) => {
      const response = await api.post<iLoginResponse>("/auth/login", data);

      return response.data;
    },
  });
}