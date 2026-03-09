import { api } from "../api/axios";
import type { iCategoryResponse } from "../interfaces/CategoryInterface";

export async function getCategoriesList() {
  const response = await api.get<iCategoryResponse[]>("/category");
  return response.data;
}

