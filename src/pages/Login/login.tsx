/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <Box>
      <Box>
        <TextField
          value={(e: any) => {
            setUserLogin(e.target.value);
            console.log(userLogin);
          }}
          label="Usuário"
          variant="outlined"
        />
        <TextField
          value={(e: any) => {
            setUserPassword(e.target.value);
            console.log(userPassword);
          }}
          label="Senha"
          variant="outlined"
          type="password"
        />
      </Box>
      <Button variant="contained" onClick={() => navigate("/dashboard")}>
        Entrar
      </Button>
    </Box>
  );
}
