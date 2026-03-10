import { useMutation, useQuery } from "@tanstack/react-query";
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
  return useMutation({
    mutationFn: (data: iCategoryRequest) => createCategory(data),
  });
}

export function useUpdateCategory() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: iCategoryRequest }) =>
      updateCategory(id, data),
  });
}

export function useDeleteCategory() {
  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
  });
}
