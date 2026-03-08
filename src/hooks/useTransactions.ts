import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../services/TransactionService";


export function useSummary(month?: number, year?: number) {
  return useQuery({
    queryKey: ["summary", month, year],
    queryFn: () => getSummary(month, year),
    refetchOnWindowFocus: false,
    retry: 1,
  });
}