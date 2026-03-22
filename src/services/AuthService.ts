import { api } from "../api/axios";
import type {
  iGoogleLoginRequest,
  iLoginRequest,
  iLoginResponse,
  iLogoutRequest,
  iUpdatePassword,
} from "../interfaces/AuthInterface";

export async function Login(data: iLoginRequest | iGoogleLoginRequest) {
  const response = await api.post<iLoginResponse>("/auth/login", data);
  return response.data;
}

export async function LinkWithGoogle(data: iGoogleLoginRequest) {
  const response = await api.post<iLoginResponse>("/auth/link-google", data);
  return response.data;
}

export async function Logout(data: iLogoutRequest) {
  const response = await api.post("/auth/logout", data);
  return response.data;
}


export async function updatePassword(password: iUpdatePassword) {
  const response = await api.put("/auth/password", password);
  return response.data;
}
