import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";
// index.js
import "bootstrap/dist/css/bootstrap.min.css";

let root = createRoot(document.getElementById("root"));

root.render(<App></App>);
