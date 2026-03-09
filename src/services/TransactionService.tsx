import { api } from "../api/axios";

export async function getSummary(month?: number, year?: number) {
  const response = await api.get("/transaction/summary", {
    params: { month, year },
  });
  return response.data;
}

export async function getTransactionsList() {
  const response = await api.get("/transaction");
  return response.data
}
