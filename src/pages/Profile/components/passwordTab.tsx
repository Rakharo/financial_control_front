import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import BaseCard from "../../../components/global/BaseCard";
import BaseButton from "../../../components/global/BaseButton";
import type { iUserResponse } from "../../../interfaces/UserInterface";
import { Security, Smartphone } from "@mui/icons-material";
import { useState } from "react";
import PasswordDialog from "../forms/passwordDialog";
import { useDeleteUser } from "../../../hooks/useUser";
import { useUser } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAlert } from "../../../contexts/AlertContext";
import { useLinkWithGoogle, usePasswordUpdate } from "../../../hooks/useAuth";
import ConfirmationDialog from "../../../components/alert/ConfirmationDialog";
import type { iUpdatePassword } from "../../../interfaces/AuthInterface";

export default function PasswordTab(props: {
  user: iUserResponse;
  openDialog: () => void;
}) {
  //REACT ROUTER
  const navigate = useNavigate();
  
  //CONTEXTS
  const { showAlert } = useAlert();
  const { logout } = useUser();

  //STATES
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  //MUTATIONS
  const updatePassword = usePasswordUpdate();
  const deleteUser = useDeleteUser();
  const linkWithGoogle = useLinkWithGoogle();

  //FUNCTIONS
  const passwordRules = [
    { label: "Pelo menos 8 caracteres", test: (v: string) => v.length >= 8 },
    {
      label: "Pelo menos uma letra maiúscula",
      test: (v: string) => /[A-Z]/.test(v),
    },
    {
      label: "Pelo menos uma letra minúscula",
      test: (v: string) => /[a-z]/.test(v),
    },
    { label: "Pelo menos um número", test: (v: string) => /\d/.test(v) },
    {
      label: "Pelo menos um caractere especial (@,$,&, etc)",
      test: (v: string) => /[^A-Za-z0-9]/.test(v),
    },
  ];

  const hasGoogle = props.user?.providers
    ? props.user.providers.includes("google")
      ? true
      : false
    : false;

  console.log(hasGoogle);

  function handleUpdatePassword(password: iUpdatePassword) {
    updatePassword.mutate(
      { data: password },
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
    <BaseCard
      cardTitle={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Security fontSize="medium" color="secondary" />
          Segurança da conta
        </Box>
      }
      contentStyle={{ justifyContent: "flex-start" }}
    >
      <Stack spacing={2} divider={<Divider flexItem />}>
        <Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2">Endereço de e-mail:</Typography>
                <Typography variant="body1">
                  {props.user?.email ?? ""}
                </Typography>
              </Box>
              <BaseButton
                btnText="Alterar senha"
                variant="outlined"
                size="small"
                color="secondary"
                onClick={() => setOpenDialog(true)}
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} justifyItems="end">
              <Box>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Smartphone fontSize="small" color="secondary" />
                  {props.user?.phone?.length
                    ? props.user?.phone.length <= 0
                      ? "Nenhum telefone cadastrado"
                      : `Tel.: Terminado em ${props.user?.phone?.slice(-4) ?? ""}`
                    : "Nenhum telefone cadastrado"}
                </Typography>
                {!props.user?.phone ? (
                  <BaseButton
                    btnText="Adicionar telefone"
                    variant="text"
                    color="secondary"
                    onClick={props.openDialog}
                    sx={{ mt: 2 }}
                  />
                ) : (
                  <></>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Typography variant="h6">Vincular conta</Typography>
          {!hasGoogle ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                marginTop: "2em",
              }}
            >
              <GoogleLogin
                onSuccess={(res) => {
                  if (res.credential) {
                    linkWithGoogle.mutate({
                      googleToken: res.credential,
                    });
                  }
                }}
                onError={() => {
                  showAlert({
                    title: "Erro!",
                    description: "Erro ao autenticar com Google",
                    severity: "error",
                  });
                }}
                useOneTap={false}
                theme="outline"
                size="large"
                text="signin"
                shape="pill"
                width="100%"
              />
            </Box>
          ) : (
            <Typography sx={{ marginTop: "2em" }}>
              Conta já vinculada ao Google!
            </Typography>
          )}
        </Box>
        <Box>
          <BaseButton
            btnText="Excluir conta"
            color="error"
            variant="text"
            onClick={() => setOpenDeleteDialog(true)}
            sx={{ alignSelf: "flex-start" }}
          />
        </Box>
      </Stack>
      <PasswordDialog
        open={openDialog}
        passwordRules={passwordRules}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleUpdatePassword}
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
    </BaseCard>
  );
}
