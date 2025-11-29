const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Sample products data
const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    price: 129.99,
    category: "electronics",
    rating: 4.5,
    inStock: true,
    features: ["Noise Cancelling", "30hr Battery", "Wireless Charging"]
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life. Perfect for active lifestyles.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    price: 199.99,
    category: "electronics",
    rating: 4.3,
    inStock: true,
    features: ["Heart Rate Monitor", "GPS", "Sleep Tracking"]
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors. Eco-friendly fashion.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    price: 24.99,
    category: "clothing",
    rating: 4.7,
    inStock: true,
    features: ["100% Organic Cotton", "Multiple Colors", "Eco-Friendly"]
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Keep your drinks hot or cold for hours with this durable 1L stainless steel insulated water bottle.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
    price: 34.99,
    category: "lifestyle",
    rating: 4.8,
    inStock: true,
    features: ["24hr Cold", "12hr Hot", "BPA Free"]
  },
  {
    name: "Professional Camera Backpack",
    description: "Water-resistant camera backpack with customizable compartments to protect your photography gear.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    price: 89.99,
    category: "accessories",
    rating: 4.6,
    inStock: false,
    features: ["Water Resistant", "Customizable", "Laptop Sleeve"]
  }
];

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      data: products,
      total: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message
    });
  }
});

// SEED products (add sample data)
router.post("/seed", async (req, res) => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    
    // Add sample products
    const products = await Product.insertMany(sampleProducts);
    
    res.json({
      success: true,
      message: "Products seeded successfully",
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to seed products",
      error: error.message
    });
  }
});

// GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message
    });
  }
});

// CREATE new product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create product",
      error: error.message
    });
  }
});

module.exports = router;