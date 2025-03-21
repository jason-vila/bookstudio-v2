import { Link } from "react-router-dom";

import styles from "./Header.module.css";
import DropdownTheme from "../DropdownTheme/DropdownTheme";
import logo from "../../assets/images/logo.svg";

const Header = ({ userProfileImage }) => {
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
        aria-label="Abrir menú lateral"
      >
        <i className={`bi bi-list ${styles["header-icon"]}`}></i>
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
                <i
                  className={`bi bi-none bi-person-circle ${styles["header-icon"]}`}
                ></i>
              )}
            </button>

            <ul className="dropdown-menu dropdown-menu-end text-small gap-1 p-2 rounded-3 mx-0 shadow bg-body-secondary border">
              <li>
                <Link
                  to="/profile"
                  className="dropdown-item rounded-2 d-flex align-items-center"
                >
                  <i className="bi bi-person me-2"></i>
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
                  <i className="bi bi-box-arrow-right me-2"></i>
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
