import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sistemcek.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    console.log('Prijava:', { email, password });

    
    navigate('/ticket');
  };

  return (
    <div
      className="login-result-container"
      style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
    >
      <div className="card large-input-card" style={{ minWidth: '320px' }}>
        <h2>Prijava</h2>
        <input
          type="email"
          placeholder="Elektronski naslov"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Geslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginTop: '1rem' }}
        />
        <button onClick={handleSubmit} style={{ marginTop: '1.25rem' }}>
          Potrdi
        </button>
        <p style={{ marginTop: '1rem' }}>
          Nimate računa?{' '}
          <span
            style={{ color: '#351f73', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => navigate('/register')}
          >
            Registriraj se
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
