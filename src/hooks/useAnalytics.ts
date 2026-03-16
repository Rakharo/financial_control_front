import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../services/AnalyticsService";

export function useDashboard({ month, year }: { month?: number; year?: number }) {
  return useQuery({
    queryKey: ["dashboard", month, year],
    queryFn: () => getDashboard(month, year),
    refetchOnWindowFocus: false,
    retry: 1,
  });
}