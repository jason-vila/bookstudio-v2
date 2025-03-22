import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List, X, PersonCircle, Person, BoxArrowRight } from "react-bootstrap-icons";

import styles from "./Header.module.css";
import DropdownTheme from "../DropdownTheme/DropdownTheme";
import logo from "../../assets/images/logo.svg";

const Header = ({ userProfileImage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const offcanvas = document.getElementById("offcanvasSidebar");

    offcanvas?.addEventListener("show.bs.offcanvas", () => setMenuOpen(true));
    offcanvas?.addEventListener("hidden.bs.offcanvas", () => setMenuOpen(false));
    
    return () => {
      offcanvas?.removeEventListener("show.bs.offcanvas", () => setMenuOpen(true));
      offcanvas?.removeEventListener("hidden.bs.offcanvas", () => setMenuOpen(false));
    };
  }, []);

  return (
    <header
      className={`${styles.header} position-fixed d-flex align-items-center px-3 bg-body-secondary border-bottom`}
    >
      <button
        className="btn-menu nav-link d-lg-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasSidebar"
        aria-controls="offcanvasSidebar"
        aria-label="Alternar menú lateral"
      >
        {menuOpen ? (
          <X className={styles["header-icon"]} />
        ) : (
          <List className={styles["header-icon"]} />
        )}
      </button>

      <div className="d-flex flex-grow-1 justify-content-between align-items-center">

        <div className="d-lg-none me-5"></div>

        <Link
          to="/"
          className="text-center text-decoration-none text-body-emphasis ms-md-2 d-flex align-items-center"
        >
          <img className="logo me-2" alt="Logo de Bookstudio" src={logo} width="25" height="25" />
          <span className={`fs-5 ${styles["text-logo"]}`}>BookStudio</span>
        </Link>

        <div className="d-flex align-items-center">
          <div className="dropdown me-2">
            <DropdownTheme dropup={false} />
          </div>

          <div className="d-flex align-items-center me-2">
            <div
              className={`vr d-none d-lg-block mx-2 ${styles.vr} ${styles["header-separator"]}`}
            ></div>
          </div>

          <div className="dropdown bd-navbar">
            <button
              type="button"
              className="btn btn-link nav-link d-flex align-items-center link-body-emphasis"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label="Abrir menú de usuario"
            >
              {userProfileImage ? (
                <img
                  src={userProfileImage}
                  alt="Foto"
                  width="24"
                  height="24"
                  className="rounded-circle"
                />
              ) : (
                <PersonCircle className={styles["header-icon"]} />
              )}
            </button>

            <ul className="dropdown-menu dropdown-menu-end text-small gap-1 p-2 rounded-3 mx-0 shadow bg-body-secondary border">
              <li>
                <Link
                  to="/profile"
                  className="dropdown-item rounded-2 d-flex align-items-center"
                >
                  <Person className="me-2" />
                  Perfil
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item rounded-2 dropdown-danger d-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#logoutModal"
                >
                  <BoxArrowRight className="me-2" />
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
