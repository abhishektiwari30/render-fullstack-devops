const express = require('express');
const promClient = require('prom-client');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Prometheus setup
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});
register.registerMetric(httpRequestsTotal);

// Middleware to count Prometheus metrics
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestsTotal.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/health', (req, res) => res.send('OK'));

app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'Alice' }]);
});

app.get('/dbcheck', (req, res) => {
  res.send(`Mongoose loaded: ${!!require('mongoose')}`);
});

// MongoDB connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
