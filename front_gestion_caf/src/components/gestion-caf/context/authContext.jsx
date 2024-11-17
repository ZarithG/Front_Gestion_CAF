import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [roleName, setRoleName] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        // Inicializar valores desde localStorage
        const storedAuthToken = localStorage.getItem("authToken");
        const storedRoleName = localStorage.getItem("roleName");
        const storedUserName = localStorage.getItem("userName");

        if (storedAuthToken) setAuthToken(storedAuthToken);
        if (storedRoleName) setRoleName(storedRoleName);
        if (storedUserName) setUserName(storedUserName);
    }, []);

    const login = (token, role, user) => {
        setAuthToken(token);
        setRoleName(role);
        setUserName(user);

        // Guardar en localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("roleName", role);
        localStorage.setItem("userName", user);
    };

    const logout = () => {
        setAuthToken(null);
        setRoleName(null);
        setUserName(null);

        // Limpiar localStorage
        localStorage.removeItem("authToken");
        localStorage.removeItem("roleName");
        localStorage.removeItem("userName");
    };

    return (
        <AuthContext.Provider value={{ authToken, roleName, userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
