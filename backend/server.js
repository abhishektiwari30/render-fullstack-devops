const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Backend is running!');
});
app.get('/health', (req, res) => res.send('OK'));
app.get('/users', (req, res) => res.json([{ id: 1, name: 'Alice' }]));

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
