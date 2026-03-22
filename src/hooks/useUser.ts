import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getMe,
  updateUser,
} from "../services/UserService";
import { useAlert } from "../contexts/AlertContext";
import type {
  iUpdateUserRequest,
  iUserRequest,
} from "../interfaces/UserInterface";

export function useMe() {
  const token = localStorage.getItem("accessToken");
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: 1,
    enabled: !!token,
  });
}

export function useCreateUser() {
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: ({ data }: { data: iUserRequest }) => createUser(data),
    onSuccess: () => {
      showAlert({
        title: "Sucesso!",
        description: `Usuário criado com sucesso!`,
        severity: "success",
      });
    },
    onError: (error) => {
      showAlert({
        title: "Erro!",
        description: error.message || "Erro ao criar usuário!",
        severity: "error",
      });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: ({ data }: { data: iUpdateUserRequest }) => updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      showAlert({
        title: "Sucesso!",
        description: `Usuário editado com sucesso!`,
        severity: "success",
      });
    },
    onError: (error) => {
      showAlert({
        title: "Erro!",
        description: error.message || "Erro ao editar usuário!",
        severity: "error",
      });
    },
  });
}

export function useDeleteUser() {
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      showAlert({
        title: "Sucesso!",
        description: `Conta excluída com sucesso!`,
        severity: "success",
      });
    },
    onError: (error) => {
      showAlert({
        title: "Erro!",
        description: error.message || "Erro ao excluir conta!",
        severity: "error",
      });
    },
  });
}
