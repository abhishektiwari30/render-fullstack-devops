const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => res.send('OK'));
app.get('/users', (req, res) => res.json([{ id: 1, name: 'Alice' }]));

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
