import React from "react";
import Header from "./components/gestion-caf/Header";
import Footer from "./components/gestion-caf/Footer";
import NavMenuAdmin from "./components/Admin/NavMenuAdmin";
import AppRoutes from "./components/rutes";

function App() {
  return (
    <>
      <Header className="Header" />
      <AppRoutes/>
      <NavMenuAdmin/>
      <Footer />
    </>
  );
}

export default App;
