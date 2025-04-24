
const Order = require("../models/order");

exports.checkout = async (req, res) => {
    try {
        const { userId } = req.body;
        const cart = await findOne({ userId }).populate("products.productId");

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        const totalAmount = cart.products.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);

        const order = new Order({
            userId,
            products: cart.products,
            totalAmount,
            status: "pending",
        });

        await order.save();
        await deleteOne({ userId });

        res.json({ message: "Checkout successful", order });
    } catch (error) {
        res.status(500).json({ error: "Failed to checkout" });
    }
};
