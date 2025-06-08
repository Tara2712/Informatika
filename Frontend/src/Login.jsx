import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sistemcek.css';
import { API_BASE_URL } from './config';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    try {
      const r = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!r.ok) throw new Error('Napačen e-mail ali geslo');
      const { token } = await r.json();
      localStorage.setItem('jwt', token);      
      
      navigate('/ticket');                           
      window.dispatchEvent(new Event('auth'));       
    } catch (err) {
      alert(err.message);
    }
  };
  
  const logout = async () => {
    const token = localStorage.getItem('jwt');
    if (!token) return;
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem('jwt');
    navigate('/'); 
    window.dispatchEvent(new Event('auth'));
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
        {/* <p style={{ marginTop: '1rem' }}>
          Nimate računa?{' '}
          <span
            style={{ color: '#351f73', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => navigate('/register')}
          >
            Registriraj se
          </span>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
