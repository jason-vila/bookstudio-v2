import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <form noValidate>
      <div id="alertContainer"></div>

      <div className="mb-4">
        <label htmlFor="email" className="form-label">
          Dirección de correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-control"
          placeholder="correo@ejemplo.com"
        />
        <div className="invalid-feedback"></div>
      </div>

      <button type="submit" className="btn btn-custom-primary w-100">
        <span
          id="spinner"
          className="spinner-border spinner-border-sm d-none"
          role="status"
        ></span>
        <span id="sendText">Enviar enlace</span>
      </button>

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
