import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../../../components/pages/Home";
import Login from "../../../components/pages/Login";
import Register from "../../../components/pages/Register";
import RegisterForm from "../../../components/pages/RegisterForm";
import ScheduleShift from "../../../components/pages/ScheduleShift";

import TermsConditions from "../../../components/pages/RegisterForm/TermsConditions";
import InformedConsent from "../../../components/pages/RegisterForm/InformedConsent";
import MedicalDocument from "../../../components/pages/RegisterForm/MedicalDocument";
import MedicalHistory from "../../../components/pages/RegisterForm/MedicalHistory";
import Regulation from "../../../components/pages/RegisterForm/Regulation";

import FitnessCenters from "../../../components/pages/pagesAdmin/FitnessCenter";
import AssignShiftsQuotas from "../../../components/pages/pagesAdmin/AssignShiftsQuotas";
import FitnessCenterUser from "../../../components/pages/pagesAdmin/FitnessCenterUser";
import DefineUserType from "../../../components/pages/pagesAdmin/DefineUserType";
import ModifyUserData from "../../../components/pages/pagesAdmin/ModifyUserData";
import RegisteredUsers from "../../../components/pages/pagesAdmin/RegisteredUsers";
import UserRegistrationRequest from "../../../components/pages/pagesAdmin/UserRegistrationRequest";
import UserDataDetail from "../../../components/pages/pagesAdmin/UserDataDetail";

import FitnessCenterCoordinators from "../../../components/pages/pagesAdmin/FitnessCenterCoordinators";
import ManageCenterCoodinators from "../../../components/pages/pagesAdmin/ManageCenterCoodinators";
import ModifyCoordinators from "../../../components/pages/pagesAdmin/ModifyCoordinators";
import ViewCoordinators from "../../../components/pages/pagesAdmin/ViewCoordinator";
import RegisterNewCoordinator from "../../../components/pages/pagesAdmin/RegisterNewCoordinator";

import ManageFitnessCenters from "../../../components/pages/pagesAdmin/ManageFitnessCenters";
import RegisterAttendance from "../../../components/pages/pagesAdmin/RegisterAttendance";
import FitnessCenterDirector from "../../../components/pages/pagesAdmin/FitnessCenterDirector";

import EmergencyContact from "../../../components/pages/Register/EmergencyContact";
import InformationData from "../../../components/pages/Register/InformationData";
import Information from "../../../components/pages/Register/Information";

import ProtectedRoute from "../../../components/gestion-caf/ProtectedRoute";
import NotFound from "../../../components/pages/NotFound";
import { USER_TYPE } from "../../../constants/constants";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/scheduleShift" element={<ScheduleShift/>}/>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />}>
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
                <Route path="/admin">
                    <Route path="assignShiftsQuotas" 
                    element= {<AssignShiftsQuotas />} />
                    <Route path="defineUserType" element={<DefineUserType />} />
                    <Route path="fitnessCenterUser" element={<FitnessCenterUser />} />
                    <Route path="fitnessCenterUser/modify" element={<ModifyUserData />} />
                    <Route path="fitnessCenterUser/registrationRequest" element={<UserRegistrationRequest />} />
                    <Route path="fitnessCenterUser/detail" element={<UserDataDetail />} />
                    
                    <Route path="fitnessCenterDirector" element={<FitnessCenterDirector />} />

                    <Route path="fitnessCenterCoordinators" element={<FitnessCenterCoordinators />} />
                    <Route path="fitnessCenterCoordinators/manage" element={<ManageCenterCoodinators />} />
                    <Route path="fitnessCenterCoordinators/modify" element={<ModifyCoordinators />} />
                    <Route path="fitnessCenterCoordinators/registerNew" element={<RegisterNewCoordinator />} />
                    <Route path="fitnessCenterCoordinators/view" element={<ViewCoordinators/>} />

                    <Route path="registerAttendance" element={<RegisterAttendance />} />
                    <Route path="fitnessCenters" element={<FitnessCenters />} />
                    <Route path="fitnessCenters/manageFitnessCenters" element={<ManageFitnessCenters />} />
                </Route>

                {/* Ruta de no encontrado */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
