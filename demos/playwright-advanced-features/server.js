const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Throttling simulation
let throttleCounter = 0;
app.get('/api/throttle', (req, res) => {
  throttleCounter++;
  if (throttleCounter % 3 === 0) {
    setTimeout(() => {
      res.status(429).json({ error: 'Too Many Requests', message: 'Throttled' });
    }, 2000);
  } else {
    res.json({ message: 'Request successful', throttleCounter });
  }
});

// Auth required endpoint
app.get('/api/auth-required', (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Missing Authorization header' });
  }
  res.json({ message: 'Authorized', user: req.headers.authorization });
});

// Echo endpoint with payload validation
app.post('/api/echo', (req, res) => {
  if (!req.body || typeof req.body.text !== 'string') {
    return res.status(400).json({ error: 'Bad Request', message: 'Missing or invalid "text" field' });
  }
  res.json({ echo: req.body.text });
});

// Always error endpoint
app.get('/api/error', (req, res) => {
  res.status(500).json({ error: 'Internal Server Error', message: 'This endpoint always fails' });
});

// Versioned endpoints
app.get('/api/v1/resource', (req, res) => {
  res.set('Deprecation', 'true');
  res.json({ version: 'v1', message: 'This is version 1 (deprecated)' });
});
app.get('/api/v2/resource', (req, res) => {
  res.json({ version: 'v2', message: 'This is version 2' });
});

// Header-based versioning
app.get('/api/resource', (req, res) => {
  const version = req.headers['x-api-version'] || req.query.version;
  if (version === '1') {
    res.set('Deprecation', 'true');
    res.json({ version: 'v1', message: 'Header-based version 1 (deprecated)' });
  } else {
    res.json({ version: 'v2', message: 'Header-based version 2' });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
