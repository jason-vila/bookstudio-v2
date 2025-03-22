import React, { useEffect, useState } from "react";
import { Sun, Moon, CircleHalf, Check2 } from "react-bootstrap-icons";

const DropdownTheme = ({ dropup = false }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "auto");
  const dropdownClass = dropup ? "dropup" : "dropdown";

  useEffect(() => {
    const applyTheme = (selectedTheme) => {
      let newTheme = selectedTheme;
      if (selectedTheme === "auto") {
        newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      document.documentElement.setAttribute("data-bs-theme", newTheme);
    };

    applyTheme(theme);

    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const selectedTheme = toggle.getAttribute("data-bs-theme-value");
        localStorage.setItem("theme", selectedTheme);
        setTheme(selectedTheme);
        applyTheme(selectedTheme);
      });
    });
  }, [theme]);

  const getActiveIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="my-1 theme-icon-active" />;
      case "dark":
        return <Moon className="my-1 theme-icon-active" />;
      default:
        return <CircleHalf className="my-1 theme-icon-active" />;
    }
  };

  return (
    <div className={dropdownClass}>
      <button
        className="btn btn-link nav-link py-2 dropdown-toggle d-flex align-items-center link-body-emphasis"
        id="bd-theme"
        type="button"
        aria-expanded="false"
        data-bs-toggle="dropdown"
        data-bs-offset="0,0"
        aria-label="Toggle theme"
      >
        {getActiveIcon()}
        <span className="visually-hidden" id="bd-theme-text">
          Cambiar tema
        </span>
      </button>

      <ul
        className="dropdown-menu gap-1 p-2 rounded-3 mx-0 shadow bg-body-secondary border"
        aria-labelledby="bd-theme-text"
      >
        {["light", "dark", "auto"].map((mode, index, array) => (
          <li key={mode} className={index !== array.length - 1 ? "mb-1" : ""}>
            <button
              type="button"
              className={`dropdown-item rounded-2 d-flex align-items-center ${
                theme === mode ? "active" : ""
              }`}
              data-bs-theme-value={mode}
              aria-pressed={theme === mode}
            >
              {mode === "light" ? (
                <Sun className="me-2" />
              ) : mode === "dark" ? (
                <Moon className="me-2" />
              ) : (
                <CircleHalf className="me-2" />
              )}
              {mode === "light"
                ? "Claro"
                : mode === "dark"
                ? "Oscuro"
                : "Sistema"}
              {theme === mode && <Check2 className="ms-auto" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownTheme;
