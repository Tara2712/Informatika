import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Sistemcek.css';

const RezultatBesediloPage = () => {
  const { state } = useLocation();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (state?.query) {
      // simulacija backend fetcha
      const fakeResults = [
        { id: 'SR123', title: 'Težava z omrežjem', content: 'Opis težave pri povezavi' },
        { id: 'SR456', title: 'Napaka pri prijavi', content: 'Uporabnik ne more dostopati' },
      ];

      setResults(fakeResults);
    }
  }, [state]);

  return (
    <div className="cardi">
      <h2>Rezultati iskanja - {results.length} podobnih zahtevkov</h2>
      {results.map((item, index) => (
        <div key={index}>
          <h4>{item.title}</h4>
          <p>{item.content}</p>
          {index < results.length - 1 && <hr/> }
        </div>
      ))}
    </div>
  );
};

export default RezultatBesediloPage;
