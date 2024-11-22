import React, { useState } from "react";
import Header from "./components/gestion-caf/Header";
import Footer from "./components/gestion-caf/Footer";
import NavMenuAdmin from "./components/Admin/NavMenuAdmin";
import AppRoutes from "./api/config/routes/routes";

function App() {
  const [state, setState] = useState(false);
  return (
    <>
      <Header className="Header" status={state} setStatus={setState}/>
      <AppRoutes status={state} setStatus={setState}/>
      <NavMenuAdmin navStatus={state} setNavStatus={setState}/>
      <Footer />
    </>
  );
}

export default App;
