import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "./config";

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
        `${API_BASE_URL}/api/sr/${encodeURIComponent(trimmedInput)}`
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
        `${API_BASE_URL}/api/sr/${encodeURIComponent(trimmedInput)}`
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
      <div className="card large-input-card" style={{ flex: 1 }}> {/**/}
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
        <div className="cardi result-card" >
          {/* style={{ flex: 2 }} */}
          {loading && <p>Nalaganje...</p>}
          {error && <h3>{error}</h3>}
          {/* {match &&
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
            ))} */}
          {match && match.length > 0 && (
            <div style={{ marginBottom: "2rem", paddingBottom: "1rem" }}>
              {/* borderBottom: "1px solid #ccc", */}
              <h2>Storitveni zahtevek – {match[0].SR ?? match[0].id} </h2> {/*{match[0].SR} */}
              <h4>{match[0].naziv}</h4>

              {match
                .sort((a, b) => new Date(a.datum) - new Date(b.datum))
                .map((item, i) => (
                  <div key={i} style={{
                    marginBottom: "1.5rem",
                    padding: "1rem",
                    borderRadius: "8px",
                    backgroundColor: "#f7f7f7",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minWidth: "400px",
                    display: "flex",
                  }}>
                    {/* <p><strong>Datum:</strong> {new Date(item.datum).toLocaleDateString("sl-SI")}</p>
                    {item.opis && (
                      <p>
                        <strong>Povzetek:</strong> {item.opis}
                      </p>
                    )}
                    {item.dolgOpis && (
                      <p style={{ fontStyle: "italic" }}>{item.dolgOpis}</p>
                    )}
                  </div> */}
                    {/* <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <div>
                        <strong>Povzetek:</strong>
                        {item.opis && (
                          <p style={{ margin: "0.25rem 0 0.5rem 0" }}>{item.opis}</p>
                        )}
                      </div>
                      <span style={{ fontStyle: "italic", color: "#555" }}>
                        {new Date(item.datum).toLocaleDateString("sl-SI")}
                      </span>
                    </div> */}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                        gap: "1rem",
                      }}
                    >
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <strong>Povzetek:</strong>
                        <span>{item.opis}</span>
                      </div>

                      <span style={{ fontStyle: "italic", color: "#351f73", fontWeight: "bold" }}>
                        {new Date(item.datum).toLocaleDateString("sl-SI")}
                      </span>
                    </div>


                    {item.dolgOpis && (
                      <p style={{ color: "#333" }}>{item.dolgOpis}</p>
                      // fontStyle: "italic",
                    )}
                  </div>

                ))}
            </div>
          )}
        </div>
      )}



    </div>
  );
};

export default TicketWithResult;
