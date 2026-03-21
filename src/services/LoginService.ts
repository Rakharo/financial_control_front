import { api } from "../api/axios";
import type {
  iGoogleLoginRequest,
  iLoginRequest,
  iLoginResponse,
} from "../interfaces/LoginInterface";

export async function Login(data: iLoginRequest | iGoogleLoginRequest) {
  const response = await api.post<iLoginResponse>("/auth/login", data);
  return response.data;
}
