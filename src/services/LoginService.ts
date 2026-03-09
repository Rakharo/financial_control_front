import { api } from "../api/axios";
import type {
  iLoginRequest,
  iLoginResponse,
} from "../interfaces/LoginInterface";

export async function Login(data: iLoginRequest) {
  const response = await api.post<iLoginResponse>("/auth/login", data);
  return response.data;
}
