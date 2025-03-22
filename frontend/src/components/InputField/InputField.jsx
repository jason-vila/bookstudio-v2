import React, { useState } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const InputField = ({
  type = "text",
  id,
  name,
  placeholder,
  pattern,
  ariaDescribedby,
  autoComplete,
  invalidFeedback = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const inputElement = (
    <input
      id={id}
      name={name}
      type={inputType}
      className={`form-control ${type === "password" ? "password-field" : ""}`}
      placeholder={placeholder}
      pattern={pattern}
      aria-describedby={ariaDescribedby}
      autoComplete={autoComplete}
      {...props}
    />
  );

  return (
    <div className="mb-3">
      <div className="input-group">
        {inputElement}
        {type === "password" && (
          <span
            className="input-group-text cursor-pointer"
            onMouseDown={(e) => e.preventDefault()}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            role="button"
            tabIndex="0"
          >
            {showPassword ? <EyeSlash /> : <Eye />}
          </span>
        )}
        {invalidFeedback && <div className="invalid-feedback"></div>}
      </div>
    </div>
  );
};

export default InputField;
