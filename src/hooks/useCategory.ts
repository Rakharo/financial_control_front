import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getCategoriesList,
  getCategoryById,
  updateCategory,
} from "../services/CategoryService";
import type {
  iCategory,
  iCategoryRequest,
} from "../interfaces/CategoryInterface";
import { useAlert } from "../contexts/AlertContext";

export function useCategoryList({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["categories", page, limit],
    queryFn: () => getCategoriesList(page, limit),
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export function useCategoryById(id: number) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: ({data}:{data: iCategoryRequest}) => createCategory(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      showAlert({
        title: "Sucesso!",
        description: `Categoria '${variables.data.name}' criada com sucesso!`,
        severity: "success",
      });
    },
    onError: (error) => {
      showAlert({
        title: "Erro!",
        description: error.message || "Erro ao criar categoria!",
        severity: "error",
      });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: iCategoryRequest }) =>
      updateCategory(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      showAlert({
        title: "Sucesso!",
        description: `Categoria '${variables.data.name}' editada com sucesso!`,
        severity: "success",
      });
    },
    onError: (error) => {
      showAlert({
        title: "Erro!",
        description: error.message || "Erro ao editar categoria!",
        severity: "error",
      });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: ({ data }: { data: iCategory }) => deleteCategory(data.id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      showAlert({
        title: "Sucesso!",
        description: `Categoria '${variables.data.name}' deletada com sucesso!`,
        severity: "success",
      });
    },
    onError: (error) => {
      showAlert({
        title: "Erro!",
        description: error.message || "Erro ao deletar categoria!",
        severity: "error",
      });
    },
  });
}
