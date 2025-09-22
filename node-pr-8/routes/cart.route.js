const express = require("express");
const cartRouter = express.Router();
const { addToCart, cartPage, cartDelete } = require("../controller/cart.controller");


cartRouter.get("/add/:id", addToCart);
cartRouter.post("/delete/:id", cartDelete);

module.exports = cartRouter;
