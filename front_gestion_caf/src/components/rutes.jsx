import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterForm from "./pages/RegisterForm";
import ScheduleShift from "./pages/ScheduleShift";
import TermsConditions from "./pages/RegisterForm/TermsConditions";
import InformedConsent from "./pages/RegisterForm/InformedConsent";
import MedicalDocument from "./pages/RegisterForm/MedicalDocument";
import MedicalHistory from "./pages/RegisterForm/MedicalHistory";
import Regulation from "./pages/RegisterForm/Regulation";
import FitnessCenters from "./pages/pagesAdmin/FitnessCenter";
import EmergencyContact from "./pages/Register/EmergencyContact";
import InformationData from "./pages/Register/InformationData";
import Information from "./pages/Register/Information";
import ProtectedRoute from "./gestion-caf/ProtectedRoute"; // Importamos el ProtectedRoute

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} >
                    <Route path="emergenceContact" element={<EmergencyContact />} />
                    <Route path="informationData" element={<InformationData />} />
                    <Route path="information" element={<Information />} />
                </Route>
                <Route path="/registration" element={<RegisterForm />}>
                    <Route path="terms" element={<TermsConditions />} />
                    <Route path="informedConsent" element={<InformedConsent />} />
                    <Route path="medicalDocument" element={<MedicalDocument />} />
                    <Route path="medicalHistory" element={<MedicalHistory />} />
                    <Route path="regulation" element={<Regulation />} />
                </Route>
                {/* Rutas protegidas según el rol */}
                <Route 
                    path="/scheduleShift" 
                    element={
                        <ProtectedRoute requiredRole="USER">
                            <ScheduleShift />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/fitnessCenters" 
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <FitnessCenters />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </>
    );
};

export default AppRoutes;
