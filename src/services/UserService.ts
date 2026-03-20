import { api } from "../api/axios";
import type {
  iUpdatePassword,
  iUpdateUserRequest,
} from "../interfaces/UserInterface";

export async function getMe() {
  const response = await api.get("/user/me");
  return response.data;
}

export async function updateUser(user: iUpdateUserRequest) {
  const response = await api.put("/user", user);
  return response.data;
}

export async function deleteUser() {
  const response = await api.delete("/user");
  return response.data;
}

export async function updatePassword(password: iUpdatePassword) {
  const response = await api.put("/user/password", password);
  return response.data;
}
