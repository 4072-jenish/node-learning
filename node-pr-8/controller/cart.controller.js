const Cart = require("../models/Cart");
const Product = require("../models/productSchema");

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
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

    // ✅ redirect to cart page route
    res.redirect("/web/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding to cart");
  }
};

// Show Cart
const cartPage = async (req, res) => {
  try {
    const cart = await Cart.findOne();
    const items = cart ? cart.items : [];
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // ✅ render with correct variable name
    res.render("web.pages/cart", { items, total });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading cart");
  }
};

// Delete from Cart
const cartDelete = async (req, res) => {
  try {
    const productId = req.params.id;
    let cart = await Cart.findOne();

    if (!cart) return res.redirect("web/cart");

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting item");
  }
};

module.exports = {
  addToCart,
  cartPage,
  cartDelete,
};
