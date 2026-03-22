import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import BaseCard from "../../../components/global/BaseCard";
import BaseButton from "../../../components/global/BaseButton";
import type { iUserResponse } from "../../../interfaces/UserInterface";
import { Email, Smartphone } from "@mui/icons-material";
import { useState } from "react";
import ConfirmationDialog from "../../../components/alert/ConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import { useLogout } from "../../../hooks/useAuth";

export default function ProfileTab(props: {
  user: iUserResponse;
  openDialog: () => void;
}) {
  //REACT ROUTER
  const navigate = useNavigate();

  //CONTEXTS
  const { logout } = useUser();

  //STATES
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  //MUTATIONS
  const logoutMutation = useLogout();

  function handleEndSession() {
    const token = localStorage.getItem("refreshToken");
    if (!token) {
      return;
    }
    logoutMutation.mutate(
      { refresh_token: token },
      {
        onSuccess: () => {
          logout();
          navigate("/");
        },
      },
    );
  }

  return (
    <BaseCard
      cardTitle={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Email fontSize="medium" color="secondary" />
          Dados da conta
        </Box>
      }
    >
      <Stack spacing={2} divider={<Divider flexItem />}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2">Nome:</Typography>
              <Typography variant="body1">{props.user?.name ?? ""}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2">Endereço de e-mail:</Typography>
              <Typography variant="body1">{props.user?.email ?? ""}</Typography>
            </Box>
            <BaseButton
              btnText="Alterar dados"
              variant="outlined"
              size="small"
              color="secondary"
              onClick={props.openDialog}
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

        <Box>
          <BaseButton
            btnText="Finalizar sessão"
            color="warning"
            variant="text"
            onClick={() => setOpenLogoutDialog(true)}
            sx={{ alignSelf: "flex-start" }}
          />
        </Box>
      </Stack>

      <ConfirmationDialog
        open={openLogoutDialog}
        variant="warning"
        title="Fazer logout"
        description="Tem certeza que deseja sair?"
        onCancel={() => setOpenLogoutDialog(false)}
        onConfirm={handleEndSession}
      />
    </BaseCard>
  );
}
