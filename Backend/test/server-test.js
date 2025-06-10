const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = require('./server');


process.env.ADMIN_EMAIL = 'admin@example.com';
process.env.ADMIN_PWHASH = bcrypt.hashSync('password123', 10);
process.env.JWT_SECRET = 'test-secret';
process.env.PORT = 5100;


jest.mock('axios');

describe('Server', () => {
  let testToken;
  let testJti;

  beforeAll(() => {
    testJti = uuidv4();
    testToken = jwt.sign({ sub: 'admin', email: 'admin@example.com', jti: testJti }, process.env.JWT_SECRET);
    app.locals.activeTokens = new Set([testJti]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Authentication', () => {
    describe('POST /auth/login', () => {
      it('should return 400 for missing fields', async () => {
        const response = await request(app)
          .post('/auth/login')
          .send({ email: 'admin@example.com' });
        
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe('Manjkajoča polja');
      });

      it('should return 401 for incorrect credentials', async () => {
        const response = await request(app)
          .post('/auth/login')
          .send({ email: 'admin@example.com', password: 'wrongpassword' });
        
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe('Napačni podatki');
      });

      it('should return a token for correct credentials', async () => {
        const response = await request(app)
          .post('/auth/login')
          .send({ email: 'admin@example.com', password: 'password123' });
        
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
      });
    });

    describe('POST /auth/logout', () => {
      it('should logout successfully with valid token', async () => {
        const response = await request(app)
          .post('/auth/logout')
          .set('Authorization', `Bearer ${testToken}`);
        
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Odjava uspešna');
        expect(app.locals.activeTokens.has(testJti)).toBe(false);
      });

      it('should return 401 for missing token', async () => {
        const response = await request(app)
          .post('/auth/logout');
        
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe('Manjkajoč žeton');
      });
    });
  });

  describe('API Endpoints', () => {
    describe('POST /api/isci', () => {
      it('should call ML API with valid token', async () => {
        axios.post.mockResolvedValue({ data: { results: [] } });
        
        const response = await request(app)
          .post('/api/isci')
          .set('Authorization', `Bearer ${testToken}`)
          .send({ query: 'test' });
        
        expect(response.status).toBe(200);
        expect(axios.post).toHaveBeenCalledWith(
          'http://ml_api:8000/search',
          { query: 'test', min_similarity: 0.3 },
          { headers: { Authorization: `Bearer ${testToken}` } }
        );
      });

      it('should handle ML API 401 error', async () => {
        axios.post.mockRejectedValue({ response: { status: 401 } });
        
        const response = await request(app)
          .post('/api/isci')
          .set('Authorization', `Bearer ${testToken}`)
          .send({ query: 'test' });
        
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe('Neveljaven ali potekel žeton (ML API)');
      });

      it('should handle ML API connection error', async () => {
        axios.post.mockRejectedValue({ code: 'ECONNREFUSED' });
        
        const response = await request(app)
          .post('/api/isci')
          .set('Authorization', `Bearer ${testToken}`)
          .send({ query: 'test' });
        
        expect(response.status).toBe(503);
        expect(response.body.msg).toBe('ML storitev (port 8000) ni dosegljiva');
      });
    });

  });
});