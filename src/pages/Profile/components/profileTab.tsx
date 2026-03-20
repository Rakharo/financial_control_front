import { Box, Grid, Typography } from "@mui/material";
import BaseCard from "../../../components/global/BaseCard";
import BaseButton from "../../../components/global/BaseButton";
import type {
  iUpdateUserRequest,
  iUserResponse,
} from "../../../interfaces/UserInterface";
import { Email, Smartphone } from "@mui/icons-material";
import ProfileDialog from "../forms/profileDialog";
import { useState } from "react";
import { useDeleteUser, useUpdateUser } from "../../../hooks/useUser";
import ConfirmationDialog from "../../../components/alert/ConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";

export default function ProfileTab(props: { user: iUserResponse }) {
  const navigate = useNavigate();
  const { logout } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  function handleUpdateUser(user: iUpdateUserRequest) {
    updateUser.mutate(
      { data: user },
      { onSuccess: () => setOpenDialog(false) },
    );
  }

  function handleDeleteAccount() {
    deleteUser.mutate(undefined, {
      onSuccess: () => {
        logout();
        navigate("/");
      },
    });
  }

  return (
    <Grid container spacing={2} sx={{ minHeight: 300 }}>
      <Grid size={{ xs: 12 }}>
        <BaseCard
          cardTitle={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Email fontSize="medium" color="secondary" />
              Dados da conta
            </Box>
          }
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2">
                Nome: {props.user?.name ?? ""}
              </Typography>
              <Typography variant="body2">
                Endereço de e-mail: {props.user?.email ?? ""}
              </Typography>
              <BaseButton
                btnText="Alterar dados"
                variant="outlined"
                size="small"
                color="secondary"
                onClick={() => setOpenDialog(true)}
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} justifyItems="end">
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Smartphone fontSize="small" color="secondary" />
                Tel.: Terminado em {"07"}
              </Typography>
            </Grid>
          </Grid>
        </BaseCard>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <BaseCard>
          <BaseButton
            btnText="Excluir conta"
            color="error"
            variant="text"
            onClick={() => setOpenDeleteDialog(true)}
            sx={{ alignSelf: "flex-start" }}
          />
        </BaseCard>
      </Grid>

      <ProfileDialog
        open={openDialog}
        initialData={props.user}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleUpdateUser}
      />

      <ConfirmationDialog
        open={openDeleteDialog}
        variant="delete"
        title="Excluir conta!"
        description="Essa ação não pode ser revertida. Se confirmado, todos os dados serão perdidos!"
        highlight="Tem certeza que deseja continuar?"
        onCancel={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteAccount}
      />
    </Grid>
  );
}
