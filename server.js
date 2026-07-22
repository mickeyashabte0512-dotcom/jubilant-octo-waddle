const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Sample Products API
app.get("/api/products", (req, res) => {
    const products = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 49.99,
            image: "/images/headphone.jpg"
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 79.99,
            image: "/images/watch.jpg"
        },
        {
            id: 3,
            name: "Running Shoes",
            price: 59.99,
            image: "/images/shoes.jpg"
        }
    ];

    res.json(products);
});

// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Page Not Found"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 ShopEase Server Running on Port ${PORT}`);
});
