import { Link } from "react-router-dom";

import InputField from '../components/InputField/InputField';
import Button from '../components/Button/Button';

const Login = () => {
  return (
    <form noValidate>
      <div className="mb-4">
        <label htmlFor="txtUsername" className="form-label">
          Nombre de usuario
        </label>
        <InputField
          type="text"
          id="txtUsername"
          name="txtUsername"
          placeholder="Ingrese su nombre de usuario"
          pattern="[A-Za-zÀ-ÿ0-9_]+"
          ariaDescribedby="usernameHelp"
          autoComplete="username"
        />
      </div>

      <div className="mb-2">
        <div className="d-flex justify-content-between align-items-center">
          <label htmlFor="txtPassword" className="form-label">
            Contraseña
          </label>
        </div>
        <InputField
            type="password"
            id="txtPassword"
            name="txtPassword"
            placeholder="Ingrese su contraseña"
            ariaDescribedby="passwordHelp"
            autoComplete="current-password"
        />
      </div>

      <div className="mb-4 d-flex justify-content-between">
        <div className="form-check text-start">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            className="form-check-input"
          />
          <label htmlFor="rememberMe" className="form-check-label text-small">
            Recuérdame
          </label>
        </div>
        <div className="text-end">
          <Link
            to="/forgot-password"
            className="text-body-emphasis text-decoration-none text-small forgot-password"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>

      <Button type="submit" variant="custom-primary" className="w-100">
        Iniciar sesión
      </Button>
    </form>
  );
};

export default Login;
