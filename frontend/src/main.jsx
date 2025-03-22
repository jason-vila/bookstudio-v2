import { createRoot } from "react-dom/client";
import AppRoutes from "./routes/AppRoutes";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./styles/global.css";

createRoot(document.getElementById("root")).render(<AppRoutes />);
