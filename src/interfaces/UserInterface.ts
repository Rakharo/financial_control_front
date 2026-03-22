export interface iUserRequest {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface iUserResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  providers: string[];
  created_at: string;
  updated_at: string;
}

export interface iUpdateUserRequest {
  name: string;
  email: string;
  phone?: string;
}

