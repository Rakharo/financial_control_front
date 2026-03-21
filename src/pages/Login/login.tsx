import { Box } from "@mui/material";
import BaseTabs from "../../components/global/BaseTabs";
import LoginTab from "./components/loginTab";
import SignUpTab from "./components/signUpTab";
import BaseCard from "../../components/global/BaseCard";
import { useState } from "react";

import bgImage from "../../assets/images/loginBackground.jpg";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../contexts/AlertContext";
import { useUser } from "../../contexts/UserContext";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const { setAuth } = useUser();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  //States
  const [tab, setTab] = useState<string | number>("login");
  const [prefillLogin, setPrefillLogin] = useState("");

  //React Query Mutation
  const loginMutation = useLogin();

  async function handleGoogleLogin(credential: string) {
    const result = await loginMutation.mutateAsync({
      googleToken: credential,
    });

    setAuth(result.access_token, result.refresh_token);

    navigate("/dashboard");

    showAlert({
      title: "Login realizado com sucesso!",
      description: `Bem vindo(a), ${result.user.name}`,
      severity: "success",
    });
  }
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,

        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(2px)",
        },

        "& > *": {
          position: "relative",
          zIndex: 1,
        },
      }}
      className="tabsBox"
    >
      <BaseCard
        sx={{
          width: "100%",
          maxWidth: 480,
          borderRadius: "1.5rem",

          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",

          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
        cardTitle="Bem-vindo(a)!"
        cardDescription="Entre ou crie sua conta"
        centerTitle
        contentStyle={{ gap: 2 }}
      >
        <BaseTabs
          value={tab}
          onChangeTab={(tab) => setTab(tab)}
          orientation="horizontal"
          tabs={[
            {
              label: "Entrar",
              value: "login",
              render: () => (
                <LoginTab
                  defaultLogin={prefillLogin}
                  onGoogleLogin={handleGoogleLogin}
                />
              ),
            },
            {
              label: "Cadastre-se",
              value: "signUp",
              render: () => (
                <SignUpTab
                  goToLogin={() => setTab("login")}
                  onSuccess={(login) => {
                    setPrefillLogin(login);
                    setTab("login");
                  }}
                  onGoogleLogin={handleGoogleLogin}
                  isGoogleLoading={loginMutation.isPending}
                />
              ),
            },
          ]}
          sx={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        />
      </BaseCard>
    </Box>
  );
}
