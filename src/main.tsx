import "primeflex/primeflex.scss";
import "primeflex/themes/primeone-dark.css";
import "primeflex/themes/primeone-light.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
