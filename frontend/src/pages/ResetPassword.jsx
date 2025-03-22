import InputField from '../components/InputField/InputField';

const ResetPassword = () => {
  return (
    <form noValidate>
      <div className="mb-4">
        <label htmlFor="newPassword" className="form-label">
          Nueva contraseña
        </label>
        <InputField
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Nueva contraseña"
            invalidFeedback={true}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="confirmNewPassword" className="form-label">
          Confirmar contraseña nueva
        </label>
        <InputField
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            placeholder="Confirmar contraseña nueva"
            invalidFeedback={true}
        />
      </div>

      <button type="submit" className="btn btn-custom-primary w-100">
        <span
          id="spinner"
          className="spinner-border spinner-border-sm d-none"
          role="status"
        ></span>
        <span id="resetText">Crear contraseña</span>
      </button>
    </form>
  );
};

export default ResetPassword;
