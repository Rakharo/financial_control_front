import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { AccountCircle, ExitToApp, Settings } from "@mui/icons-material";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function stringToColor(string: string) {
  let hash = 0;

  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name?: string) {
  if (!name) {
    return { children: "?" };
  }

  const names = name.trim().split(/\s+/);

  const initials =
    names.length === 1
      ? names[0][0]
      : `${names[0][0]}${names[names.length - 1][0]}`;

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials.toUpperCase(),
  };
}

export default function TopBar() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleOpenMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <AppBar
      position="static"
      sx={{
        borderRadius: "1rem",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Controle Financeiro</Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>{user?.name}</Typography>

          <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
            <Avatar {...stringAvatar(user?.name)} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                navigate("/profile");
              }}
              sx={{ gap: 1 }}
            >
              <AccountCircle fontSize="small" color="primary" />
              Perfil
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleCloseMenu();
                navigate("/settings");
              }}
              sx={{ gap: 1 }}
            >
              <Settings fontSize="small" color="primary" />
              Configurações
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={() => {
                handleCloseMenu();
                handleLogout();
              }}
              sx={{ gap: 1 }}
            >
              <ExitToApp fontSize="small" color="primary" />
              Sair
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
