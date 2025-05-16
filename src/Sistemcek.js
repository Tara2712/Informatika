import React from 'react';
import './Sistemcek.css';

const Sistemcek = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>Sistemček</h1>
      </header>
      <div className="card">
        <h2>Vnesite celotno besedilo ali ključne besedne</h2>
        <textarea placeholder="Besedilo..." />
        <button>Potrdi</button>
      </div>
    </div>
  );
};

export default Sistemcek;
