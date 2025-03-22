import React from "react";
import { Button as ReactBootstrapButton } from "react-bootstrap";

const Button = ({ variant = "primary", className = "", children, ...props }) => {
  const isCustomVariant = variant.startsWith("custom-");

  return (
    <ReactBootstrapButton
      variant={isCustomVariant ? null : variant}
      className={`btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </ReactBootstrapButton>
  );
};

export default Button;
