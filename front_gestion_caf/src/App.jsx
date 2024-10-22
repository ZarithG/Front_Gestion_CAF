import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/gestion-caf/Header";
import Footer from "./components/gestion-caf/Footer";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register"

function App() {
  return (
    <>
      <Header className="Header" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
