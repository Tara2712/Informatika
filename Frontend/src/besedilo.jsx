import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BesediloPage = () => {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (text.trim()) {
      navigate('/rezultatBesedilo', {
        state: { query: text.trim() }
      });
    }
  };

  return (
    <div className="card large-textarea-card">
      <h2>Vnesite celotno besedilo ali ključne besedne</h2>
      <textarea
        placeholder="Besedilo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit}>Potrdi</button>
    </div>
  );
};

export default BesediloPage;
