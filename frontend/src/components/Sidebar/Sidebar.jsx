import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { 
  BarChart, BarChartFill,
  FileEarmarkText, FileEarmarkTextFill,
  JournalBookmark, JournalBookmarkFill,
  PersonPlus, PersonPlusFill,
  Map, MapFill,
  Stickies, StickiesFill,
  Mortarboard, MortarboardFill,
  People, PeopleFill,
  ArrowBarLeft, ArrowBarRight
} from "react-bootstrap-icons";
import Button from "../Button/Button";

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
      icon: (isActive) => isActive ? <BarChartFill className="pe-none me-2" /> : <BarChart className="pe-none me-2" />,
      adminOnly: false
    },
    {
      to: "/loans",
      label: "Préstamos",
      icon: (isActive) => isActive ? <FileEarmarkTextFill className="pe-none me-2" /> : <FileEarmarkText className="pe-none me-2" />,
      adminOnly: false
    },
    {
      to: "/books",
      label: "Libros",
      icon: (isActive) => isActive ? <JournalBookmarkFill className="pe-none me-2" /> : <JournalBookmark className="pe-none me-2" />,
      adminOnly: false
    },
    {
      to: "/authors",
      label: "Autores",
      icon: (isActive) => isActive ? <PersonPlusFill className="pe-none me-2" /> : <PersonPlus className="pe-none me-2" />,
      adminOnly: false
    },
    {
      to: "/publishers",
      label: "Editoriales",
      icon: (isActive) => isActive ? <MapFill className="pe-none me-2" /> : <Map className="pe-none me-2" />,
      adminOnly: false
    },
    {
      to: "/courses",
      label: "Cursos",
      icon: (isActive) => isActive ? <StickiesFill className="pe-none me-2" /> : <Stickies className="pe-none me-2" />,
      adminOnly: false
    },
    {
      to: "/students",
      label: "Estudiantes",
      icon: (isActive) => isActive ? <MortarboardFill className="pe-none me-2" /> : <Mortarboard className="pe-none me-2" />,
      adminOnly: false
    },
    {
      to: "/users",
      label: "Usuarios",
      icon: (isActive) => isActive ? <PeopleFill className="pe-none me-2" /> : <People className="pe-none me-2" />,
      adminOnly: true
    }
  ];

  const SidebarLink = ({ to, label, icon, active, withTooltip = false }) => {
    const linkContent = (
      <Link
        to={to}
        aria-label={label}
        className={`nav-link text-body-emphasis d-flex align-items-center rounded-2 ${active ? styles["active-effect"] : styles.hovered}`}
        style={{ minHeight: '40px' }}
      >
        {icon(active)}
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
        
        return (
          <li className="mb-1" key={link.to}>
            <SidebarLink
              to={link.to}
              label={link.label}
              icon={link.icon}
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
    <Button
      type="button"
      variant="custom-secondary"
      className="border-0 text-body-emphasis d-flex align-items-center text-nowrap px-3"
      onClick={toggleSidebar}
      aria-label="Alternar barra lateral"
      style={{ minHeight: '36px' }}
    >
      {isCollapsed ? 
        <ArrowBarRight /> : 
        <ArrowBarLeft />
      }
      {!isCollapsed && (
        <span className={`ms-2 ${styles["sidebar-link"]}`}>Cerrar barra lateral</span>
      )}
    </Button>
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