import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import "./Sistemcek.css";
import TicketWithResult from "./TicketWithResult.jsx";
// import KategorijePage from './kategorije.jsx';
import BesediloWithResult from "./BesediloWithResult.jsx";
import Login from "./Login.jsx";
import Registracija from "./Registracija.jsx";
import logo from "./slike/Logo_crn-brezOzadje.png";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("jwt");
  return token ? children : <Navigate to="/login" replace />;
};

function Sistemcek() {
  const [auth, setAuth] = useState(!!localStorage.getItem("jwt"));

  useEffect(() => {
    const handler = () => setAuth(!!localStorage.getItem("jwt"));
    window.addEventListener("auth", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("auth", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    window.dispatchEvent(new Event("auth"));
    setAuth(false);
  };

  return (
    <Router>
      <div className="container">
        <header className="header">
          <div className="logo-title">
            <img src={logo} alt="Logo" className="logo" />
            <h1>Ticketray</h1>
            <div className="login-register">
              {auth ? (
                <NavLink
                  to="/login"
                  onClick={handleLogout}
                  className={({ isActive }) =>
                    isActive ? "tab-items active" : "tab-items"
                  }
                >
                  Odjava
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "tab-items active" : "tab-items"
                  }
                >
                  Prijava
                </NavLink>
              )}
            </div>
          </div>
          <nav className="tab-bar">
            {auth ? (
              <>
                <NavLink
                  to="/ticket"
                  className={({ isActive }) =>
                    isActive ? "tab-item active" : "tab-item"
                  }
                >
                  Zahtevek
                </NavLink>
                <NavLink
                  to="/besedilo"
                  className={({ isActive }) =>
                    isActive ? "tab-item active" : "tab-item"
                  }
                >
                  Besedilo
                </NavLink>
              </>
            ) : (
              <>
                <span className="tab-item disabled">Zahtevek</span>
                <span className="tab-item disabled">Besedilo</span>
              </>
            )}

            {/* <NavLink to="/kategorije" className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}>Kategorije</NavLink> */}
          </nav>
        </header>

        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registracija />} />

            <Route
              path="/ticket"
              element={
                <RequireAuth>
                  {" "}
                  <TicketWithResult />{" "}
                </RequireAuth>
              }
            />
            {/* <Route path="/kategorije" element={<KategorijePage />} /> */}
            <Route
              path="/besedilo"
              element={
                <RequireAuth>
                  {" "}
                  <BesediloWithResult />{" "}
                </RequireAuth>
              }
            />
            {/* Redirecta na /ticket na default */}
            <Route
              path="/"
              element={
                auth ? (
                  <Navigate to="/ticket" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route path="/isci-sr" element={<TicketWithResult />} />
            <Route path="/isci" element={<BesediloWithResult />} />
          </Routes>
        </div>

        <footer className="footer">
          <p>&copy; Ticketray 2025 Maribor, Slovenija.</p>
        </footer>
      </div>
    </Router>
  );
}

export default Sistemcek;
