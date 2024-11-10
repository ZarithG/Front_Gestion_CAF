import React from "react";
import { Route, Navigate } from "react-router-dom";
import { USER_TYPE } from "../../constants/constants";

const ProtectedRoute = ({ element: Element, requiredRole, ...rest }) => {
    const roleName = localStorage.getItem("roleName");
    if (requiredRole === USER_TYPE.USER){
        requiredRole = USER_TYPE.USER
    }

    if (roleName !== requiredRole) {
        console.log(roleName , requiredRole);
        return <Navigate to="/" replace />; // Redirigir al inicio si el rol no es el adecuado
    }

    return <Route {...rest} element={<Element />} />;
};

export default ProtectedRoute;


