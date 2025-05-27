import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Sistemcek.css';

const RezultatBesediloPage = () => {
  const { state } = useLocation();       
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!state?.query) return;           

    (async () => {
      setLoading(true); setError(null);

      try {
        const res = await fetch('http://localhost:5000/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: state.query }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();                    // { matches:[…] }

        setResults(Array.isArray(data.matches) ? data.matches : data);
      } catch (err) {
        setError(err.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [state]);

  return (
    <div className="cardi">
      {loading && <p>Nalaganje …</p>}
      {error   && <p className="error">Napaka: {error}</p>}

      {!loading && !error && (
        <>
          <h2>Rezultati iskanja – {results.length} podobnih zahtevkov</h2>

          {results.map((item, index) => (
            <div key={item.id ?? index}>
              <h4>
                {item.id && <span>{item.id} – </span>}
                {item.naziv ?? item.title}
              </h4>

              {/* prikaz opisa in/ali dolgega opisa, če obstajata */}
              {item.opis      && <p>{item.opis}</p>}
              {item.dolgOpis  && <p>{item.dolgOpis}</p>}

              {index < results.length - 1 && <hr />}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default RezultatBesediloPage;
