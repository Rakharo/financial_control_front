import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        padding: 3,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Outlet />
    </Box>
  );
}