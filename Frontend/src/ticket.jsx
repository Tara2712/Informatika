import React, { useState } from 'react';

const TicketWithResult = () => {
  const [inputValue, setInputValue] = useState('');
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!inputValue.trim()) return;
    setLoading(true);
    setError(null);
    setMatch(null);
    setHasSearched(true);

    try {
      const response = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: inputValue.trim() })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const found = data.matches.find(
        item => item.id.toLowerCase() === inputValue.trim().toLowerCase()
      );

      if (!found) {
        setError('Zahtevek ni bil najden');
      } else {
        setMatch(found);
      }
    } catch (err) {
      setError(`Napaka: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ticket-result-container" style={{ display: 'flex', gap: '2rem' }}>
      <div className="card large-input-card" style={{ flex: 1 }}>
        <h2>Iskanje storitvenega zahtevka</h2>
        <input
          type="text"
          placeholder="npr. SR324182"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSearch}>Potrdi</button>
      </div>

      {hasSearched && (
        <div className="cardi result-card" style={{ flex: 2 }}>
          {loading && <p>Nalaganje...</p>}
          {error && <h3>{error}</h3>}
          {match && (
            <>
              <h2>Storitveni zahtevek - {match.id}</h2>
              <h4>{match.naziv}</h4>
              <p>{match.opis}</p>
              <p>{match.dolgOpis}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketWithResult;
