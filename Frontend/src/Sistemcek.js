import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './Sistemcek.css';
import TicketPage from './ticket';
import KategorijePage from './kategorije';
import BesediloPage from './besedilo';

const Sistemcek = () => {
  return (
    <Router>
      <div className="container">
        <header className="header">
          <div className="logo-title">
            <img src="/slike/Logo_črn-brezOzadje.png" alt="Logo" className="logo" />
            <h1>Ticketray</h1>
          </div>
          <nav className="tab-bar">
            <NavLink to="/ticket" className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}>Ticket</NavLink>
            <NavLink to="/kategorije" className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}>Kategorije</NavLink>
            <NavLink to="/besedilo" className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}>Besedilo</NavLink>
          </nav>
        </header>

        <div className="content">
          <Routes>
            <Route path="/ticket" element={<TicketPage />} />
            <Route path="/kategorije" element={<KategorijePage />} />
            <Route path="/besedilo" element={<BesediloPage />} />
            {/* Redirecta na /ticket na default */}
            <Route path="/" element={<TicketPage />} />
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
