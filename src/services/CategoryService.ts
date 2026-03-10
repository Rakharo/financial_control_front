import { api } from "../api/axios";
import type { iCategoryRequest, iCategoryResponse } from "../interfaces/CategoryInterface";

export async function getCategoriesList() {
  const response = await api.get<iCategoryResponse[]>("/category");
  return response.data;
}

export async function getCategoryById(id: number) {
  const response = await api.get<iCategoryResponse>(`/category/${id}`);
  return response.data;
}

export async function createCategory(data: iCategoryRequest) {
  const response = await api.post<iCategoryResponse>("/category", data);
  return response.data;
}

export async function updateCategory(id: number, data: iCategoryRequest) {
  const response = await api.put<iCategoryResponse>(`/category/${id}`, data);
  return response.data;
}

export async function deleteCategory(id: number) {
  const response = await api.delete(`/category/${id}`);
  return response.data;
}


