const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Serve static files (index.html, css, js) from the root folder
app.use(express.static(path.join(__dirname)));

// Sample product catalog API
const products = [
  { id: 1, name: "Minimalist Watch", price: 49.99 },
  { id: 2, name: "Wireless Earbuds", price: 29.99 },
  { id: 3, name: "Leather Backpack", price: 79.99 },
  { id: 4, name: "Mechanical Keyboard", price: 89.99 }
];

// GET Route: Send product catalog
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

// POST Route: Process order checkout
app.post('/api/checkout', (req, res) => {
  const { cart } = req.body;
  if (!cart || cart.length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty." });
  }
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  res.status(200).json({ success: true, message: "Order received!", total: total.toFixed(2) });
});

// Explicitly serve index.html for the root route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// For local development
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
