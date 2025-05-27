import React from 'react';
import { useParams } from 'react-router-dom';

const RezultatSrPage = () => {
  const { id } = useParams();

  // TODO: Nadomesti z realnimi fetchanimi podatki iz backenda glede na SR oz. id
  const nazivSR = `Naziv za ${id}`;
  const vsebina = `Vsebina zahtevka ${id}...`;

  return (
    <div className="cardi">
      <h2>Storitveni zahtevek - {id}</h2>
      <h4>{nazivSR}</h4>
      <p>{vsebina}</p>
    </div>
  );
};

export default RezultatSrPage;
