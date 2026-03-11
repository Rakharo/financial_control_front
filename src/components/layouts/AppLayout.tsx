import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

export default function AppLayout() {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        padding: '2em',
        flexGrow: 1,
      }}
    >
      <TopBar />

      <Box sx={{ marginTop: '2em'}}>
        <Outlet />
      </Box>
    </Box>
  );
}
