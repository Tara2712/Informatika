import React, { useState } from 'react';

const BesediloWithResult = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null); // This is the fix

  const handleSubmit = async () => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    setLoading(true);
    setError(null);
    setResults([]);
    setHasSearched(true);
    setExpandedIndex(null); // Reset expanded index

    try {
      const res = await fetch('http://localhost:5100/api/isci', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmedText }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setResults(Array.isArray(data.results) ? data.results : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const groupedResults = results.reduce((acc, item) => {
  const key = item.sr || 'Neznan vir';
  if (!acc[key]) acc[key] = [];
  acc[key].push(item);
  return acc;
}, {});


  return (
    <div className="besedilo-result-container" style={{ display: 'flex', gap: '2rem' }}>
      <div className="card large-textarea-card" style={{ flex: 1 }}>
        <h2>Vnesite ključne besede, besedilo ...</h2>
        <textarea
          placeholder="Besedilo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSubmit}>Potrdi</button>
      </div>

      {hasSearched && (
        <div className="cardi result-card" style={{ flex: 2 }}>
          {loading && <p>Nalaganje …</p>}
          {error && <p className="error">Napaka: {error}</p>}

          {!loading && !error && (
            <>
              <h2>Rezultati iskanja – {results.length} podobnih zahtevkov</h2>
              {results.map((item, index) => (
                <div key={item.id ?? index} style={{ marginBottom: '1rem', width: '100%'}}>
                  <div
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    style={{
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      background: '#f8f8f8',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <h4 style={{ margin: 0 }}>
                      {item.id && <span>{item.id} – </span>}
                      {item.naziv ?? item.title}
                    </h4>
                    <span
                      style={{
                        transform: expandedIndex === index ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        fontSize: '1.25rem',
                      }}
                    >
                      ▶
                    </span>
                  </div>


                  <div className={`accordion-container ${expandedIndex === index ? 'open' : ''}`}>
                    {/* {item.sr && <p style={{fontWeight: 'bold', fontStyle: 'italic'}}>{item.sr}</p>}
                    {item.datum && new Date(item.datum).toLocaleDateString('sl-SI')} */}
                    {(item.sr || item.datum) && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {item.sr && <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{item.sr}</span>}
                        {item.datum && <span style={{fontStyle: 'italic'}}>{new Date(item.datum).toLocaleDateString('sl-SI')}</span>}
                      </div>
                    )}
                    {/* {item.opis && <p>{item.opis}</p>}
                    {item.dolgOpis && <p>{item.dolgOpis}</p>} */}

                    {/* {item.opis && (
                      <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
                        Povzetek: <span style={{ fontWeight: 'normal' }}>{item.opis}</span>
                      </p>
                    )}
                    {item.dolgOpis && (
                      <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
                        {item.dolgOpis}
                      </p>
                    )} */}

                    <div style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem' }}>
                      {item.opis && <p><strong>Povzetek:</strong> {item.opis}</p>}
                      {item.dolgOpis && <p >{item.dolgOpis}</p>}
                    </div>

                    {/* {item.PODOBNOST} */}
                  </div>

                  {index < results.length - 1}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BesediloWithResult;
