import type { iUserResponse } from "./UserInterface";

export interface iLoginRequest {
  login: string;
  password: string;
}

export interface iLoginResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    user: iUserResponse;
}
