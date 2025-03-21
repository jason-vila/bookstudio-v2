import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import DropdownTheme from "../components/DropdownTheme/DropdownTheme";
import logo from "../assets/images/logo.svg";

const AuthLayout = ({ title, subtitle }) => {
  useEffect(() => {
    document.body.classList.add("auth-layout");
    return () => {
      document.body.classList.remove("auth-layout");
    };
  }, []);

  return (
    <>
      <div className="position-fixed w-100 h-100 bg-body">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <main className="w-100 mx-4" style={{ maxWidth: "384px" }}>
            <section className="card border">
              <header className="card-header text-center bg-body-secondary">
                <img
                  className="logo mt-1 mb-2"
                  alt="Logo de Bookstudio"
                  src={logo}
                  width="40"
                  height="40"
                />
                <h3 className="fw-bold mb-0">{title}</h3>
                <p className="text-muted text-small mb-0">{subtitle}</p>
              </header>
              <div className="card-body">
                <Outlet />
              </div>
            </section>
          </main>
        </div>
      </div>

      <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3">
        <DropdownTheme dropup={true} />
      </div>
      
      <div className="toast-container" id="toast-container"></div>
    </>
  );
};

export default AuthLayout;
