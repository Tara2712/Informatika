import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const TicketWithResult = () => {
  const [inputValue, setInputValue] = useState("");
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const srParam = searchParams.get("sr");
    if (srParam) {
      setInputValue(srParam);
      handleSearchByParam(srParam);
    }
  }, [searchParams]);

  const handleSearch = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;
    setLoading(true);
    setError(null);
    setMatch(null);
    setHasSearched(true);

    try {
      const response = await fetch(
        `http://localhost:5100/api/sr/${encodeURIComponent(trimmedInput)}`
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      // const found = data.matches.find(
      //   item => item.id.toLowerCase() === inputValue.trim().toLowerCase()
      // );

      // if (!found) {
      //   setError('Zahtevek ni bil najden');
      // } else {
      //   setMatch(found);
      // }
      if (!data.results || data.results.length === 0) {
        setError("Zahtevek ni bil najden");
      } else {
        setMatch(data.results); // <-- now an array of matches
      }
    } catch (err) {
      setError(`Napaka: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByParam = async (sr) => {
    const trimmedInput = sr.trim();
    if (!trimmedInput) return;
    setLoading(true);
    setError(null);
    setMatch(null);
    setHasSearched(true);

    try {
      const response = await fetch(
        `http://localhost:5100/api/sr/${encodeURIComponent(trimmedInput)}`
      );
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        setError("Zahtevek ni bil najden");
      } else {
        setMatch(data.results);
      }
    } catch (err) {
      setError(`Napaka: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="ticket-result-container"
      style={{ display: "flex", gap: "2rem" }}
    >
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
          {match &&
            match.map((item, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <h2>Storitveni zahtevek – {item.SR ?? item.id}</h2>
                <h4>{item.naziv}</h4>
                {item.opis && (
                  <p>
                    <strong>Povzetek:</strong> {item.opis}
                  </p>
                )}
                {item.dolgOpis && (
                  <p style={{ fontStyle: "italic" }}>{item.dolgOpis}</p>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TicketWithResult;
