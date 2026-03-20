import { Box } from "@mui/material";
import { useUser } from "../../contexts/UserContext";
import BaseTabs from "../../components/global/BaseTabs";
import ProfileTab from "./components/profileTab";
import PasswordTab from "./components/passwordTab";

export default function Profile() {
  const { user } = useUser();

  return (
    <Box>
      <BaseTabs
        initialValue={"profile"}
        orientation="vertical"
        sx={{ minHeight: 300 }}
        tabs={[
          {
            label: "Detalhes da conta",
            value: "profile",
            render: () => <ProfileTab user={user!} />,
          },
          {
            label: "Segurança",
            value: "security",
            render: () => <PasswordTab user={user!} />,
          },
        ]}
      />
    </Box>
  );
}
