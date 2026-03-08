import { api } from "../api/axios";


export async function getMe() {
  const response = await api.get("/user/me");
  return response.data;
}