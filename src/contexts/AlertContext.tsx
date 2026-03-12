/* eslint-disable react-refresh/only-export-components */
// alert-context.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import BaseAlert from "../components/alert/BaseAlert";

type AlertOptions = {
  title: string;
  description: string;
  severity?: "success" | "error" | "warning" | "info";
  autoHideDuration?: number;
};

type AlertContextType = {
  showAlert: (options: AlertOptions) => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<AlertOptions | null>(null);
  const [open, setOpen] = useState(false);

  const showAlert = (options: AlertOptions) => {
    setAlert(options);
    setOpen(true);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {alert && (
        <BaseAlert
          open={open}
          title={alert.title}
          description={alert.description}
          severity={alert.severity}
          autoHideDuration={alert.autoHideDuration ?? 6000}
          actionBtn
          onClose={() => setOpen(false)}
        />
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error("useAlert must be used within AlertProvider");
  }
  return ctx;
}
