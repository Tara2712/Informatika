import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RezultatSrPage = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: id })
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        const found = data.matches.find(
          item =>
            item.id.toLowerCase() === id.toLowerCase()
        );

        if (!found) {
          setError('Zahtevek ni bil najden.');
        } else {
          setMatch(found);
        }
      } catch (err) {
        setError(`Napaka: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  if (loading) return <p>Nalaganje...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cardi">
      <h2>Storitveni zahtevek - {match.id}</h2>
      <h4>{match.naziv}</h4>
      <p>{match.opis}</p>
      <p>{match.dolgOpis}</p>
    </div>
  );
};

export default RezultatSrPage;
