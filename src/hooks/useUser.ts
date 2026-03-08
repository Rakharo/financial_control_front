import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/UserService";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: 1,
  });
}