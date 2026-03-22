import { Box } from "@mui/material";
import { useUser } from "../../contexts/UserContext";
import BaseTabs from "../../components/global/BaseTabs";
import ProfileTab from "./components/profileTab";
import PasswordTab from "./components/passwordTab";
import ProfileDialog from "./forms/profileDialog";
import { useState } from "react";
import type { iUpdateUserRequest } from "../../interfaces/UserInterface";
import { useUpdateUser } from "../../hooks/useUser";

export default function Profile() {
  const { user } = useUser();
  const [openDialog, setOpenDialog] = useState(false);

  const updateUser = useUpdateUser();

  function handleUpdateUser(user: iUpdateUserRequest) {
    updateUser.mutate(
      { data: user },
      { onSuccess: () => setOpenDialog(false) },
    );
  }

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
            render: () => (
              <ProfileTab user={user!} openDialog={() => setOpenDialog(true)} />
            ),
          },
          {
            label: "Segurança",
            value: "security",
            render: () => (
              <PasswordTab
                user={user!}
                openDialog={() => setOpenDialog(true)}
              />
            ),
          },
        ]}
      />

      <ProfileDialog
        open={openDialog}
        initialData={user}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleUpdateUser}
      />
    </Box>
  );
}
