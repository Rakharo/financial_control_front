import { useQuery } from "@tanstack/react-query";
import { getCategoriesList } from "../services/CategoryService";


export function useCategoryList() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => getCategoriesList(),
    refetchOnWindowFocus: false,
    retry: 1,
  });
}