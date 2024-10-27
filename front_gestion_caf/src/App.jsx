import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/gestion-caf/Header";
import Footer from "./components/gestion-caf/Footer";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import RegisterForm from "./components/pages/RegisterForm";
import ScheduleShift from "./components/pages/ScheduleShift";
import TermsConditions from "./components/pages/RegisterForm/TermsConditions";
import EmergencyContact from "./components/pages/RegisterForm/EmergencyContact";
import Estate from "./components/pages/RegisterForm/Estate";
import Information from "./components/pages/RegisterForm/Information";
import InformedConsent from "./components/pages/RegisterForm/InformedConsent";
import MedicalDocument from "./components/pages/RegisterForm/MedicalDocument";
import MedicalHistory from "./components/pages/RegisterForm/MedicalHistory";
import Regulation from "./components/pages/RegisterForm/Regulation";

function App() {
  return (
    <>
      <Header className="Header" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registration" element={<RegisterForm />}>
          <Route path="terms" element={<TermsConditions />} />          <Route path="emergenceContact" element={<EmergencyContact/>}/>
          <Route path="estate" element={<Estate/>}/>
          <Route path="information" element={<Information/>}/>
          <Route path="informedConsent" element={<InformedConsent/>}/>
          <Route path="medicalDocument" element={<MedicalDocument/>}/>
          <Route path="medicalHistory" element={<MedicalHistory/>}/>
          <Route path="regulation" element={<Regulation/>}/>
          </Route>
        <Route path="/scheduleShift" element={<ScheduleShift />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
