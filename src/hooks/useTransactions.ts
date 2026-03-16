import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactionsList,
  updateTransaction,
} from "../services/TransactionService";
import type { iTransaction, iTransactionRequest } from "../interfaces/TransactionInterface";
import { useAlert } from "../contexts/AlertContext";

export function useTransactionsList({
  page,
  limit,
  month,
  year,
}: {
  page?: number;
  limit?: number;
  month?: number;
  year?: number;
}) {
  return useQuery({
    queryKey: ["transactions", page, limit, month, year],
    queryFn: () => getTransactionsList(page, limit, month, year),
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
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: ({data}: {data: iTransactionRequest}) =>
      createTransaction(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });

      showAlert({
        title: "Sucesso!",
        description: `Transação '${variables.data.title}' criada com sucesso!`,
        severity: "success",
      });
    },
    onError: (error) => {
      showAlert({
        title: "Erro!",
        description: error.message || "Erro ao criar transação!",
        severity: "error",
      });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: iTransactionRequest }) =>
      updateTransaction(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });

      showAlert({
        title: "Sucesso!",
        description: `Transação '${variables.data.title}' editada com sucesso!`,
        severity: "success",
      });
    },
    onError: (error) => {
      showAlert({
        title: "Erro!",
        description: error.message || "Erro ao editar transação!",
        severity: "error",
      });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: ({data} : {data: iTransaction}) => deleteTransaction(data.id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });

      showAlert({
        title: "Sucesso!",
        description: `Transação '${variables.data.title}' deletada com sucesso!`,
        severity: "success",
      });
    },
    onError: (error) => {
      showAlert({
        title: "Erro!",
        description: error.message || "Erro ao deletar transação!",
        severity: "error",
      });
    },
  });
}
