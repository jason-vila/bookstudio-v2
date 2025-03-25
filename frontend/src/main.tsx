import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider.tsx";

import AppRoutes from "./routes/AppRoutes.tsx";
import "./index.css";
import "@fontsource/inter/400.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <AppRoutes />
  </ThemeProvider>
);
