import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getMe,
  updatePassword,
  updateUser,
} from "../services/UserService";
import { useAlert } from "../contexts/AlertContext";
import type {
  iUpdatePassword,
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

export function usePasswordUpdate() {
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: ({ data }: { data: iUpdatePassword }) => updatePassword(data),
    onSuccess: () => {
      showAlert({
        title: "Sucesso!",
        description: `Senha alterada com sucesso!`,
        severity: "success",
      });
    },
    onError: (error) => {
      showAlert({
        title: "Erro!",
        description: error.message || "Erro ao alterar senha!",
        severity: "error",
      });
    },
  });
}
