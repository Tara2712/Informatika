const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

process.env.ADMIN_EMAIL = 'admin@example.com';
process.env.ADMIN_PWHASH = bcrypt.hashSync('password123', 10);
process.env.JWT_SECRET = 'test-secret';

const { authRouter } = require('../auth'); 


const express = require('express');
const app = express();
app.use(express.json());
app.use('/auth', authRouter());


describe('Auth Router', () => {
  describe('POST /auth/login', () => {
    it('should return 401 for incorrect email', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'wrong@example.com', password: 'password123' });
      
      expect(response.status).toBe(401);
      expect(response.body.msg).toBe('Napaka');
    });

    it('should return 401 for incorrect password', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'admin@example.com', password: 'wrongpassword' });
      
      expect(response.status).toBe(401);
      expect(response.body.msg).toBe('Napaka');
    });

    it('should return a token for correct credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'admin@example.com', password: 'password123' });
      
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      
      const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET);
      expect(decoded.email).toBe('admin@example.com');
      expect(decoded.sub).toBe('admin');
    });
  });

});