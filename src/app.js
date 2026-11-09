import express from 'express';

const app = express();

app.use(express.json());

// Health check endpoint (vital for CI/CD readiness probes & monitoring)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Sample API endpoint
app.get('/api/welcome', (req, res) => {
  const name = req.query.name || 'Developer';
  res.status(200).json({
    message: `Hello, ${name}! Welcome to CI/CD Practice.`,
    version: '1.0.0'
  });
});

// Sample calculation endpoint for unit/integration testing
app.post('/api/calculate', (req, res) => {
  const { a, b, operation } = req.body;

  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'Both "a" and "b" must be numbers' });
  }

  let result;
  switch (operation) {
    case 'add':
      result = a + b;
      break;
    case 'subtract':
      result = a - b;
      break;
    case 'multiply':
      result = a * b;
      break;
    case 'divide':
      if (b === 0) {
        return res.status(400).json({ error: 'Cannot divide by zero' });
      }
      result = a / b;
      break;
    default:
      return res.status(400).json({ error: 'Invalid operation. Use add, subtract, multiply, or divide.' });
  }

  res.status(200).json({ result });
});

export default app;
