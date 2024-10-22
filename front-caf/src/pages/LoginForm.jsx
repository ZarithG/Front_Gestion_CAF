const LoginForm = () => {

    return (
      <div className="LoginContainer">
        <div className="headerContainer">
          <img className="headerIconLogo"alt="Logo" />
          <div className="headerTitle">Bienvenido</div>
        </div>
        <div>
          <div className="buttonLogin">
            <input
              type="text"
              placeholder="Nombre de usuario"
              
            />
          </div>
          <div className="buttonLogin">
            <input
              type="password"
              placeholder="Contraseña"
              
            />
          </div>
          
        </div>
      </div>
    );
  };
  
  export default LoginForm;