const express = require("express");
const { getUserCart, addToCart } = require("../controllers/cart-controller");

const router = express.Router();

router.get("/:userId", getUserCart);
router.post("/", addToCart);

module.exports = router;
