import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTransaction,
  deleteTransaction,
  getSummary,
  getTransactionById,
  getTransactionsList,
  updateTransaction,
} from "../services/TransactionService";
import type { iTransactionRequest } from "../interfaces/TransactionInterface";

export function useSummary(month?: number, year?: number) {
  return useQuery({
    queryKey: ["summary", month, year],
    queryFn: () => getSummary(month, year),
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export function useTransactionsList() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactionsList(),
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export function useTransactionById(id: number) {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransactionById(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: iTransactionRequest) => createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: iTransactionRequest }) =>
      updateTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });
}

export function useDeleteTransaction() {
  return useMutation({
    mutationFn: (id: number) => deleteTransaction(id),
  });
}
