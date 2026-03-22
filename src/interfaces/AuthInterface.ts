import type { iUserResponse } from "./UserInterface";

export interface iLoginRequest {
  email: string;
  password: string;
}

export interface iGoogleLoginRequest {
  googleToken: string;
}

export interface iLoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: iUserResponse;
  providers: string[];
}

export interface iLogoutRequest {
  refresh_token: string;
}


export interface iUpdatePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}