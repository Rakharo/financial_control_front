import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import Login from "./pages/Login/login";
import Dashboard from "./pages/Dashboard/dashboard";
import { ThemeProviderCustom, useThemeMode } from "./contexts/ThemeContext";
import getTheme from "./themes/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AlertProvider } from "./contexts/AlertContext";
import Profile from "./pages/Profile/profile";
import AuthInitializer from "./auth/authInitializer";

function App() {
  function AppContent() {
    const { mode } = useThemeMode();
    const theme = getTheme(mode);

    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AlertProvider>
            <AuthInitializer />
            <Routes>
              {/* rota pública */}
              <Route path="/" element={<Login />} />

              {/* rotas protegidas */}
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </AlertProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
  return (
    <ThemeProviderCustom>
      <AppContent />
    </ThemeProviderCustom>
  );
}

export default App;
