import React from 'react';
//import { useState } from 'react';
//import './BesediloPage.css';


const BesediloPage = () => {
  return (
    <div className="card large-textarea-card">
      <h2>Vnesite celotno besedilo ali ključne besedne</h2>
      <textarea placeholder="Besedilo..." />
      <button>Potrdi</button>
    </div>
  );
};

export default BesediloPage;