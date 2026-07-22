const express = require('express');
const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// In-memory product catalog matching your store setup
const products = [
  { id: 1, name: "Minimalist Watch", price: 49.99 },
  { id: 2, name: "Wireless Earbuds", price: 29.99 },
  { id: 3, name: "Leather Backpack", price: 79.99 },
  { id: 4, name: "Mechanical Keyboard", price: 89.99 }
];

// GET Route: Send product catalog to the frontend
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

// POST Route: Process order checkout
app.post('/api/checkout', (req, res) => {
  const { cart } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty." });
  }

  // Calculate order total on the backend to prevent price tampering
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  console.log("New order received:", { items: cart, total });

  res.status(200).json({
    success: true,
    message: "Order received successfully!",
    total: total.toFixed(2)
  });
});

// For local testing (Vercel automatically wraps Express into a serverless function)
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running locally at http://localhost:${PORT}`);
  });
}

// Required for Vercel deployment
module.exports = app;
