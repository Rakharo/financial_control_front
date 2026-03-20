export interface iUserRequest {
  name: string;
  email: string;
  login: string;
  password: string;
}

export interface iUserResponse {
  id: number;
  name: string;
  email: string;
  login: string;
}

export interface iUpdateUserRequest {
  name: string;
  email: string;
  login: string;
}

export interface iUpdatePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
