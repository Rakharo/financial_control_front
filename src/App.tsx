import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import Login from "./pages/Login/login";
import Dashboard from "./pages/Dashboard/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* rota pública */}
        <Route path="/" element={<Login />} />

        {/* rotas protegidas */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;