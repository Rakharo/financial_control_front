import { api } from "../api/axios";
import type { iDashboard } from "../interfaces/AnalyticsInterface";

export async function getDashboard(month?: number, year?: number) {
  const response = await api.get<iDashboard>("/analytics/dashboard", {
    params: { month, year },
  });
  return response.data;
}
