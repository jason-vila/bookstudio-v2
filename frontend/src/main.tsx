import { createRoot } from "react-dom/client";
import { ThemeProvider } from 'next-themes';

import AppRoutes from "./routes/AppRoutes.tsx";
import "./globals.css";
import "@fontsource/inter/400.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    enableColorScheme
  >
    <AppRoutes />
  </ThemeProvider>
);
