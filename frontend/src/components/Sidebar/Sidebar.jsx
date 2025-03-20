import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import styles from "./Sidebar.module.css";

const Sidebar = ({ role = "administrador", username = "Invitado", isCollapsed, toggleSidebar }) => {
  const location = useLocation();
  const currentPage = location.pathname;

  useEffect(() => {
    if (role) {
      sessionStorage.setItem("userRole", role);
    }
  }, [role]);

  const navigationLinks = [
    {
      to: "/",
      label: "Dashboard",
      iconBase: "bi-bar-chart",
      adminOnly: false
    },
    {
      to: "/loans",
      label: "Préstamos",
      iconBase: "bi-file-earmark-text",
      adminOnly: false
    },
    {
      to: "/books",
      label: "Libros",
      iconBase: "bi-journal-bookmark",
      adminOnly: false
    },
    {
      to: "/authors",
      label: "Autores",
      iconBase: "bi-person-plus",
      adminOnly: false
    },
    {
      to: "/publishers",
      label: "Editoriales",
      iconBase: "bi-map",
      adminOnly: false
    },
    {
      to: "/courses",
      label: "Cursos",
      iconBase: "bi-stickies",
      adminOnly: false
    },
    {
      to: "/students",
      label: "Estudiantes",
      iconBase: "bi-mortarboard",
      adminOnly: false
    },
    {
      to: "/users",
      label: "Usuarios",
      iconBase: "bi-people",
      adminOnly: true
    }
  ];

  const SidebarLink = ({ to, label, iconClass, active, withTooltip = false }) => {
    const linkContent = (
      <Link
        to={to}
        aria-label={label}
        className={`nav-link text-body-emphasis d-flex align-items-center rounded-2
          ${active ? styles["active-effect"] : styles.hovered}`}
      >
        <i className={`bi pe-none me-2 ${iconClass}`}></i>
        <span className={withTooltip ? styles["sidebar-link"] : ""}>
          {label}
        </span>
      </Link>
    );
  
    if (withTooltip) {
      return (
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id={`tooltip-${to}`}>{label}</Tooltip>}
        >
          {linkContent}
        </OverlayTrigger>
      );
    }

    return linkContent;
  };

  const renderSidebarLinks = (withTooltip = false) => {
    return navigationLinks.map((link) => {
      if (!link.adminOnly || role === "administrador") {
        const isActive = currentPage === link.to;
        const iconClass = `${link.iconBase}${isActive ? "-fill" : ""}`;
        
        return (
          <li className="mb-1" key={link.to}>
            <SidebarLink
              to={link.to}
              label={link.label}
              iconClass={iconClass}
              active={isActive}
              withTooltip={withTooltip}
            />
          </li>
        );
      }
      return null;
    });
  };

  const SidebarToggleButton = (
    <button
      type="button"
      className="btn btn-custom-secondary border-0 text-body-emphasis d-flex align-items-center text-nowrap px-3"
      onClick={toggleSidebar}
      aria-label="Alternar barra lateral"
    >
      <i className={`bi ${isCollapsed ? "bi-arrow-bar-right" : "bi-arrow-bar-left"}`} />
      {!isCollapsed && (
        <span className={`ms-2 ${styles["sidebar-link"]}`}>Cerrar barra lateral</span>
      )}
    </button>
  );

  return (
    <>
      <aside
        className={`${styles.sidebar} position-fixed d-none d-lg-flex flex-column border-end bg-body-secondary
        ${isCollapsed ? styles.collapsed : ""}`}
        data-current-page={currentPage}
      >
        <ul className="nav flex-column p-3 flex-grow-1">
          {renderSidebarLinks(isCollapsed)}
        </ul>

        <footer className="py-2 d-flex justify-content-center border-top">
          {isCollapsed ? (
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="toggle-sidebar-tooltip">Abrir barra lateral</Tooltip>}
            >
              {SidebarToggleButton}
            </OverlayTrigger>
          ) : (
            SidebarToggleButton
          )}
        </footer>
      </aside>

      <aside
        className="offcanvas offcanvas-start border-end bg-body-secondary"
        id="offcanvasSidebar"
        aria-labelledby="offcanvasSidebarLabel"
      >
        <nav className="offcanvas-body d-flex flex-column p-0">
          <ul className="nav flex-column p-3 flex-grow-1">
            {renderSidebarLinks(false)}
          </ul>

          <footer className="p-4 mt-auto">
            <p className="text-muted mb-0">
              Sesión iniciada como: <span className="text-body-emphasis">{username}</span>
            </p>
          </footer>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;