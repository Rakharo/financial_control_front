import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
  return (
    <Box>
      <span>Dashboard</span>
      <Button variant="contained" onClick={() => navigate("/")}>
        Voltar
      </Button>
    </Box>
  );
}
