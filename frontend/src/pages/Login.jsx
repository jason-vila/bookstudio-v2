import { Link } from "react-router-dom";

const Login = () => {
  return (
    <form noValidate>
      {/* Campo de nombre de usuario */}
      <div className="mb-4">
        <label htmlFor="txtUsername" className="form-label">
          Nombre de usuario
        </label>
        <input
          id="txtUsername"
          name="txtUsername"
          type="text"
          className="form-control"
          placeholder="Ingrese su nombre de usuario"
          pattern="[A-Za-zÀ-ÿ0-9_]+"
          aria-describedby="usernameHelp"
          autoComplete="username"
        />
      </div>

      {/* Campo de contraseña */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <label htmlFor="txtPassword" className="form-label">
            Contraseña
          </label>
          <Link
            to="/forgot-password"
            className="text-body-emphasis text-decoration-none forgot-password"
          >
            <small>¿Olvidaste tu contraseña?</small>
          </Link>
        </div>
        <div className="input-group">
          <input
            id="txtPassword"
            name="txtPassword"
            type="password"
            className="form-control password-field"
            placeholder="Ingrese su contraseña"
            aria-describedby="passwordHelp"
            autoComplete="current-password"
          />
          <span className="input-group-text cursor-pointer">
            <i className="bi bi-eye"></i>
          </span>
        </div>
      </div>

      <button type="submit" className="btn btn-custom-primary w-100">
        <span
          id="spinner"
          className="spinner-border spinner-border-sm d-none"
          role="status"
        ></span>
        <span id="loginText">Iniciar Sesión</span>
      </button>
    </form>
  );
};

export default Login;
