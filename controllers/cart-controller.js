const Cart = require("../models/cart");


exports.getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate("products.productId");
        res.json(cart || { userId: req.params.userId, products: [] });
    } catch (error) {
        res.status(500).json({ error: "Failed to get cart" });
    }
};


exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        const existingProduct = cart.products.find(p => p.productId.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "Failed to add to cart" });
    }
};
