
const express = require("express");
const router = express.Router();
const { addToCart, cartPage, cartDelete } = require("../controller/cart.controller");

router.get("/", cartPage);
router.get("/add/:id", addToCart);
router.post("/delete/:id", cartDelete);

module.exports = router;
