import { api } from "../api/axios";
import type { iSummary, iTransactionResponse } from "../interfaces/TransactionInterface";

export async function getSummary(month?: number, year?: number) {
  const response = await api.get<iSummary>("/transaction/summary", {
    params: { month, year },
  });
  return response.data;
}

export async function getTransactionsList() {
  const response = await api.get<iTransactionResponse[]>("/transaction");
  return response.data
}
