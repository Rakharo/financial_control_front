import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getCategoriesList,
  getCategoryById,
  updateCategory,
} from "../services/CategoryService";
import type { iCategoryRequest } from "../interfaces/CategoryInterface";

export function useCategoryList() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesList(),
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
  return useMutation({
    mutationFn: (data: iCategoryRequest) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: iCategoryRequest }) =>
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}

export function useDeleteCategory() {
  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
  });
}
