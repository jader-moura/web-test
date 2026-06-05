const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const transactions = [];

app.get('/transactions', (req, res) => {
  res.json(transactions);
});

app.post('/transactions', (req, res) => {
  const { amount, description } = req.body;

  const parsedAmount = Number(amount);

  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }

  if (typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({ error: 'Description is required' });
  }

  const transaction = {
    id: transactions.length + 1,
    amount: parsedAmount,
    description: description.trim(),
    createdAt: new Date().toISOString(),
  };

  transactions.push(transaction);

  res.status(201).json(transaction);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
