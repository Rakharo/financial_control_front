import { Box } from "@mui/material";
import BaseTabs from "../../components/global/BaseTabs";
import LoginTab from "./components/loginTab";
import SignUpTab from "./components/signUpTab";
import BaseCard from "../../components/global/BaseCard";
import { useState } from "react";

export default function Login() {
  const [tab, setTab] = useState<string | number>("login");
  const [prefillLogin, setPrefillLogin] = useState("");
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <BaseCard
        sx={{
          width: "100%",
          maxWidth: 480,
          borderRadius: "1.5rem",
          boxShadow: 3,
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
              render: () => <LoginTab defaultLogin={prefillLogin} />,
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
                />
              ),
            },
          ]}
        />
      </BaseCard>
    </Box>
  );
}
