const Cart = require("../models/Cart");

const addToCart = async (req , res) => {
     try {
            const { productId, name, price, image } = req.body;
    
            let item = await Cart.findOne({ productId });
            if (item) {
                item.quantity += 1;
                await item.save();
            } else {
                await Cart.create({
                    productId,
                    name,
                    price,
                    image,
                    quantity: 1
                });
            }
    
            res.redirect("/cart");
        } catch (err) {
            console.error(err);
            res.status(500).send("Error adding to cart");
        }
}

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
    addToCart,
    cartPage,
    cartDelete
};