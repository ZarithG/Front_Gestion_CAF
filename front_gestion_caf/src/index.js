import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Asegúrate de que esta ruta sea correcta
import "./index.css"; // Si tienes estilos globales
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
