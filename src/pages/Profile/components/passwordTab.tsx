import { Box, Grid, Typography } from "@mui/material";
import BaseCard from "../../../components/global/BaseCard";
import BaseButton from "../../../components/global/BaseButton";
import type {
  iUpdatePassword,
  iUserResponse,
} from "../../../interfaces/UserInterface";
import { Security, Smartphone } from "@mui/icons-material";
import { useState } from "react";
import PasswordDialog from "../forms/passwordDialog";
import { usePasswordUpdate } from "../../../hooks/useUser";
import { useUser } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function PasswordTab(props: { user: iUserResponse }) {
  const { logout } = useUser();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const updatePassword = usePasswordUpdate();

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

  function handleUpdatePassword(password: iUpdatePassword) {
    updatePassword.mutate(
      { data: password },
      { onSuccess: () => setOpenDialog(false) },
    );
  }

  function handleEndSession() {
    logout();
    navigate("/");
  }

  return (
    <Grid container spacing={2} sx={{ minHeight: 300 }}>
      <Grid size={{ xs: 12 }}>
        <BaseCard
          cardTitle={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Security fontSize="medium" color="secondary" />
              Segurança da conta
            </Box>
          }
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2">
                Login do usuário: {props.user.login ?? ""}
              </Typography>
              <Typography variant="body2">
                Endereço de e-mail: {props.user.email ?? ""}
              </Typography>
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
            btnText="Finalizar sessão"
            color="error"
            variant="text"
            onClick={handleEndSession}
            sx={{ alignSelf: "flex-start" }}
          />
        </BaseCard>
      </Grid>

      <PasswordDialog
        open={openDialog}
        passwordRules={passwordRules}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleUpdatePassword}
      />
    </Grid>
  );
}
