import { createContext, useContext, useState } from "react";
import type { iUserResponse } from "../interfaces/UserInterface";
import { useMe } from "../hooks/useUser";

type UserContextType = {
  user: iUserResponse | null;
  token: string | null;
  setAuth: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: user } = useMe();
  const [token, setToken] = useState<string | null>(null);

  function setAuth(accessToken: string, refreshToken: string) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  function logout() {
    setToken(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  return (
    <UserContext.Provider
      value={{ user: user ?? null, token, setAuth, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}
