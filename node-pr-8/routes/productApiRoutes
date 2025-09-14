// routes/productApiRoutes.js
const express = require("express");
const router = express.Router();
const products = require("../data/products.json"); // or DB

// GET /api/products
router.get("/", (req, res) => {
  let result = [...products];
  const { category, price, rating, search } = req.query;

  if (category && category !== "all") {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (price && price !== "all") {
    if (price.includes("-")) {
      const [min, max] = price.split("-").map(Number);
      result = result.filter(p => p.price >= min && p.price <= max);
    } else if (price.endsWith("+")) {
      const min = parseFloat(price);
      result = result.filter(p => p.price >= min);
    }
  }

  if (rating && rating !== "0") {
    result = result.filter(p => p.rating >= parseFloat(rating));
  }

  if (search) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(result);
});

module.exports = router;
