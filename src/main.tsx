import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { UserProvider } from "./contexts/UserContext";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import dayjs from "dayjs";
import { GoogleOAuthProvider } from "@react-oauth/google";

dayjs.locale("pt-br");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <UserProvider>
        <GoogleOAuthProvider clientId="886522038636-kbjmui0f7t0h4lcdg4lrfc7sik168jsu.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </UserProvider>
    </ReactQueryProvider>
  </StrictMode>,
);
