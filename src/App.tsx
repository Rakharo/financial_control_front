import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import Login from "./pages/Login/login";
import Dashboard from "./pages/Dashboard/dashboard";
import { ThemeProviderCustom, useThemeMode } from "./contexts/ThemeContext";
import getTheme from "./themes/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

function App() {
  function AppContent() {
    const { mode } = useThemeMode();
    const theme = getTheme(mode);

    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* rota pública */}
            <Route path="/" element={<Login />} />

            {/* rotas protegidas */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
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
