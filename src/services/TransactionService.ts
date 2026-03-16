import { api } from "../api/axios";
import type {
  iTransaction,
  iTransactionRequest,
  iTransactionResponse,
} from "../interfaces/TransactionInterface";

export async function getTransactionsList(page?: number, limit?: number, month?: number, year?: number) {
  const response = await api.get<iTransactionResponse>("/transaction", {
    params: { page, limit, month, year },
  });
  return response.data;
}

export async function getTransactionById(id: number) {
  const response = await api.get<iTransaction>(`/transaction/${id}`);
  return response.data;
}

export async function createTransaction(data: iTransactionRequest) {
  const response = await api.post<iTransaction>("/transaction", data);
  return response.data;
}

export async function updateTransaction(id: number, data: iTransactionRequest) {
  const response = await api.put<iTransaction>(
    `/transaction/${id}`,
    data,
  );
  return response.data;
}

export async function deleteTransaction(id: number) {
  const response = await api.delete(`/transaction/${id}`);
  return response.data;
}
