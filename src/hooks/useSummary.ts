import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

type Summary = {
  balance: number;
  total_income: number;
  total_expense: number;
};

export function useSummary(month?: number, year?: number) {
  return useQuery({
    queryKey: ["summary", month, year],
    queryFn: async () => {
      const response = await api.get("/transaction/summary", {
        params: { month, year },
      });

      return response.data as Summary;
    },
  });
}