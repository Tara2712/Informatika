import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sistemcek.css';


const Register = () => {
  const [form, setForm] = useState({
    ime: '',
    priimek: '',
    email: '',
    geslo: '',
    potrdiGeslo: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.geslo !== form.potrdiGeslo) {
      alert('Gesli se ne ujemata');
      return;
    }

    
    console.log('Registracija:', form);

    navigate('/Login');
  };

  return (
    <div
      className="register-result-container"
      style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
    >
      <div className="card large-input-card" style={{ minWidth: '320px' }}>
        <h2>Registracija</h2>
        <input
          name="ime"
          placeholder="Ime"
          value={form.ime}
          onChange={handleChange}
        />
        <input
          name="priimek"
          placeholder="Priimek"
          value={form.priimek}
          onChange={handleChange}
          style={{ marginTop: '1rem' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Elektronski naslov"
          value={form.email}
          onChange={handleChange}
          style={{ marginTop: '1rem' }}
        />
        <input
          type="password"
          name="geslo"
          placeholder="Geslo"
          value={form.geslo}
          onChange={handleChange}
          style={{ marginTop: '1rem' }}
        />
        <input
          type="password"
          name="potrdiGeslo"
          placeholder="Potrdi geslo"
          value={form.potrdiGeslo}
          onChange={handleChange}
          style={{ marginTop: '1rem' }}
        />
        <button onClick={handleSubmit} style={{ marginTop: '1.25rem' }}>
          Potrdi
        </button>
        <p style={{ marginTop: '1rem' }}>
          Že imate račun?{' '}
          <span
            style={{ color: '#351f73', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Prijava
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
