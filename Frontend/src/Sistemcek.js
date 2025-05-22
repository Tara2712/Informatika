import React from 'react';
import './Sistemcek.css';

const Sistemcek = () => {
  return (
    <div className="container">
      <header className="header">
        <div className="logo-title">
          <img src="/slike/Logo_črn-brezOzadje.png" alt="Logo" className="logo" />
          <h1>Ticketray</h1>
        </div>
      </header>
      <div className="content">
        <div className="left-section">
          <div className="card small">
            <h2>Iskanje storitvenega zahtevka</h2>
            <input type="text" placeholder="npr. SR324182" />
          </div>
          <div className="card small">
            <h2>Iskanje po kategorijah</h2>
            <select>
              <option>Izberite iz seznama</option>
              {/* Dodaj kategorije tukaj */}
              <option>Kategorija 1</option>
              <option>Kategorija 2</option>
              <option>Kategorija 3</option>
            </select>
          </div>
        </div>
        <div className="card right-section">
          <h2>Vnesite celotno besedilo ali ključne besedne</h2>
          <textarea placeholder="Besedilo..." />
          <button>Potrdi</button>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; Ticketray 2025 Maribor, Slovenia</p>
      </footer>
    </div>
  );
};

export default Sistemcek;
