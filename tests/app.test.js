import request from 'supertest';
import app from '../src/app.js';

describe('API Endpoints - CI/CD Test Suite', () => {
  describe('GET /health', () => {
    it('should return 200 and status UP', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('UP');
      expect(res.body).toHaveProperty('uptime');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/welcome', () => {
    it('should return default welcome message', async () => {
      const res = await request(app).get('/api/welcome');
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Hello, Developer! Welcome to CI/CD Practice.');
      expect(res.body.version).toBe('1.0.0');
    });

    it('should return personalized welcome message with query param', async () => {
      const res = await request(app).get('/api/welcome?name=Alex');
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Hello, Alex! Welcome to CI/CD Practice.');
    });
  });

  describe('POST /api/calculate', () => {
    it('should correctly add two numbers', async () => {
      const res = await request(app)
        .post('/api/calculate')
        .send({ a: 10, b: 5, operation: 'add' });

      expect(res.status).toBe(200);
      expect(res.body.result).toBe(15);
    });

    it('should correctly subtract two numbers', async () => {
      const res = await request(app)
        .post('/api/calculate')
        .send({ a: 10, b: 4, operation: 'subtract' });

      expect(res.status).toBe(200);
      expect(res.body.result).toBe(6);
    });

    it('should correctly multiply two numbers', async () => {
      const res = await request(app)
        .post('/api/calculate')
        .send({ a: 7, b: 6, operation: 'multiply' });

      expect(res.status).toBe(200);
      expect(res.body.result).toBe(42);
    });

    it('should correctly divide two numbers', async () => {
      const res = await request(app)
        .post('/api/calculate')
        .send({ a: 20, b: 4, operation: 'divide' });

      expect(res.status).toBe(200);
      expect(res.body.result).toBe(5);
    });

    it('should return 400 for division by zero', async () => {
      const res = await request(app)
        .post('/api/calculate')
        .send({ a: 10, b: 0, operation: 'divide' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Cannot divide by zero');
    });

    it('should return 400 for invalid operation', async () => {
      const res = await request(app)
        .post('/api/calculate')
        .send({ a: 5, b: 5, operation: 'modulo' });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/Invalid operation/);
    });

    it('should return 400 for non-numeric inputs', async () => {
      const res = await request(app)
        .post('/api/calculate')
        .send({ a: 'five', b: 5, operation: 'add' });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/must be numbers/);
    });
  });
});
