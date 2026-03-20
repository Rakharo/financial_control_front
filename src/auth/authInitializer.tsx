import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { setLogoutHandler } from "./authEvents";

export default function AuthInitializer() {
  const navigate = useNavigate();
  const { logout } = useUser();

  useEffect(() => {
    setLogoutHandler(() => {
      logout();
      navigate("/");
    });
  }, [logout, navigate]);

  return null;
}