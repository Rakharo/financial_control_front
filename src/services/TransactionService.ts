import { api } from "../api/axios";
import type {
  iSummary,
  iTransactionRequest,
  iTransactionResponse,
} from "../interfaces/TransactionInterface";

export async function getSummary(month?: number, year?: number) {
  const response = await api.get<iSummary>("/transaction/summary", {
    params: { month, year },
  });
  return response.data;
}

export async function getTransactionsList() {
  const response = await api.get<iTransactionResponse[]>("/transaction");
  return response.data;
}

export async function getTransactionById(id: number) {
  const response = await api.get<iTransactionResponse>(`/transaction/${id}`);
  return response.data;
}

export async function createTransaction(data: iTransactionRequest) {
  const response = await api.post<iTransactionResponse>("/transaction", data);
  return response.data;
}

export async function updateTransaction(id: number, data: iTransactionRequest) {
  const response = await api.put<iTransactionResponse>(
    `/transaction/${id}`,
    data,
  );
  return response.data;
}

export async function deleteTransaction(id: number) {
  const response = await api.delete(`/transaction/${id}`);
  return response.data;
}
