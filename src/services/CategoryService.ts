import { api } from "../api/axios";
import type { iCategory, iCategoryRequest, iCategoryResponse } from "../interfaces/CategoryInterface";

export async function getCategoriesList(page?: number, limit?: number) {
  const response = await api.get<iCategoryResponse>("/category", {
    params: { page, limit },
  });
  return response.data;
}

export async function getCategoryById(id: number) {
  const response = await api.get<iCategory>(`/category/${id}`);
  return response.data;
}

export async function createCategory(data: iCategoryRequest) {
  const response = await api.post<iCategory>("/category", data);
  return response.data;
}

export async function updateCategory(id: number, data: iCategoryRequest) {
  const response = await api.put<iCategory>(`/category/${id}`, data);
  return response.data;
}

export async function deleteCategory(id: number) {
  const response = await api.delete(`/category/${id}`);
  return response.data;
}


