import { useMutation } from "@tanstack/react-query";
import { api } from "../api/axios";

type LoginData = {
  login: string;
  password: string;
};

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await api.post("/login", data);

      return response.data;
    },
  });
}