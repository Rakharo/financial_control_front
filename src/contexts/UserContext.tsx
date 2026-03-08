/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useContext, useEffect, useState } from "react";
import type { iUserResponse } from "../interfaces/UserInterface";

type UserContextType = {
  user: iUserResponse | null;
  token: string | null;
  setAuth: (user: iUserResponse, accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<iUserResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);

  function setAuth(user: iUserResponse, accessToken: string, refreshToken: string) {
    setUser(user);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  function logout() {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
  }

  useEffect(() => {
    const existingToken = localStorage.getItem("token");

    if (existingToken) {
      setToken(existingToken);
    } else {
      logout();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, token, setAuth, logout }}>
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
