import { api } from "../api/axios";
import type {
  iUpdateUserRequest,
  iUserRequest,
} from "../interfaces/UserInterface";

export async function getMe() {
  const response = await api.get("/user/me");
  return response.data;
}

export async function createUser(user: iUserRequest) {
  const response = await api.post("/register", user);
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
