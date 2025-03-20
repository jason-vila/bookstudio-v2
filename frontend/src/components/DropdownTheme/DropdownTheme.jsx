import React, { useEffect, useState } from "react";

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
        return "bi-sun";
      case "dark":
        return "bi-moon";
      default:
        return "bi-circle-half";
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
        <i className={`bi my-1 theme-icon-active ${getActiveIcon()}`}></i>
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
              <i
                className={`bi me-2 ${
                  mode === "light"
                    ? "bi-sun"
                    : mode === "dark"
                    ? "bi-moon"
                    : "bi-circle-half"
                }`}
              ></i>
              {mode === "light"
                ? "Claro"
                : mode === "dark"
                ? "Oscuro"
                : "Sistema"}
              <i
                className={`bi ms-auto bi-check2 ${
                  theme === mode ? "" : "d-none"
                }`}
              ></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownTheme;
