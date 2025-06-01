import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import './Sistemcek.css';
import TicketWithResult from './ticket.jsx';
// import KategorijePage from './kategorije.jsx';
import BesediloWithResult from './besedilo.jsx';
import Login from './Login.jsx';
import Registracija from './Registracija.jsx';
import logo from './slike/Logo_crn-brezOzadje.png';

const Sistemcek = () => {
  return (
    <Router>
      <div className="container">
        <header className="header">
          <div className="logo-title">
            <img src={logo} alt="Logo" className="logo" />
            <h1>Ticketray</h1>
          </div>
          <nav className="tab-bar">
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}>Prijava</NavLink>
            <NavLink to="/ticket" className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}>Zahtevek</NavLink>
            {/* <NavLink to="/kategorije" className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}>Kategorije</NavLink> */}
            <NavLink to="/besedilo" className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}>Besedilo</NavLink>
          </nav>
        </header>

        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registracija />} />

            <Route path="/ticket" element={<TicketWithResult />} />
            {/* <Route path="/kategorije" element={<KategorijePage />} /> */}
            <Route path="/besedilo" element={<BesediloWithResult />} />
            {/* Redirecta na /ticket na default */}
            <Route path="/" element={<TicketWithResult />} />
          </Routes>
        </div>

        <footer className="footer">
          <p>&copy; Ticketray 2025 Maribor, Slovenia.</p>
        </footer>
      </div>
    </Router>
  );
};

export default Sistemcek;
