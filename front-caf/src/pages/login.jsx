import React from "react";

const Login = ({onStart}) => {
    return (
        <div>
            <button onClick={onStart} className="startPageButtom">
                Entrar
            </button>
        </div>
    )
}

export default Login;