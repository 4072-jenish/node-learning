const Cart = require("../models/Cart");
const Product = require("../models/productSchema");

const addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id; 

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      item => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: 1
      });
    }

    await cart.save();
    res.redirect("/web/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding to cart");
  }
};

const cartPage = async (req , res) => {
      try {
        const items = await Cart.find();
        const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        res.render("cart", { items, total });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading cart");
    }
}

const cartDelete = async (req , res) => {
     try {
        await Cart.findByIdAndDelete(req.params.id);
        res.redirect("/cart");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting item");
    }
}

module.exports = {
    cartPage,
    addToCart,
    cartDelete
};