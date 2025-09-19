const express = require("express");
const cartRouter = express.Router();
const { addToCart, cartPage, cartDelete } = require("../controller/cart.controller");


cartRouter.post("/add", addToCart);
cartRouter.get("/", cartPage);
cartRouter.post("/delete/:id", cartDelete);

module.exports = cartRouter;
