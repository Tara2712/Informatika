import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TicketPage = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (inputValue.trim()) {
      navigate(`/rezultatSR/${inputValue.trim()}`);
    }
  };

  return (
    <div className="card large-input-card">
      <h2>Iskanje storitvenega zahtevka</h2>
      <input
        type="text"
        placeholder="npr. SR324182"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSearch}>Potrdi</button>
    </div>
  );
};

export default TicketPage;
