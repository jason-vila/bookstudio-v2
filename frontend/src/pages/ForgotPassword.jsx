import { Link } from "react-router-dom";

import InputField from '../components/InputField/InputField';
import Button from '../components/Button/Button';

const ForgotPassword = () => {
  return (
    <form noValidate>
      <div id="alertContainer"></div>

      <div className="mb-4">
        <label htmlFor="email" className="form-label">
          Dirección de correo electrónico
        </label>
        <InputField
          type="email"
          id="email"
          name="email"
          placeholder="correo@ejemplo.com"
        />
        <div className="invalid-feedback"></div>
      </div>

      <Button type="submit" variant="custom-primary" className="w-100">
        Enviar enlace
      </Button>

      <Link
        to="/login"
        className="btn btn-custom-secondary w-100 mt-3 text-decoration-none"
      >
        Cancelar
      </Link>
    </form>
  );
};

export default ForgotPassword;
