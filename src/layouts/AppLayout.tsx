import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

export default function AppLayout() {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        padding: 3,
        backgroundColor: "#f5f5f5",
        flexGrow: 1,
      }}
    >
      <TopBar />

      <Box sx={{ padding: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
