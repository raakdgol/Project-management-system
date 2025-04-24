const Product = require("../models/Product");
const path = require("path");
const fs = require("fs");

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, stock, image } = req.body;
        let imagePath = "";

        if (image && image.startsWith("data:image")) {
            const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
            const imageBuffer = Buffer.from(base64Data, "base64");
            const imageName = `${Date.now()}.png`;
            imagePath = `/uploads/${imageName}`;

            const uploadDir = path.join(__dirname, "..", "public", "uploads");
            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

            fs.writeFileSync(path.join(uploadDir, imageName), imageBuffer);
        }

        const product = new Product({ name, price, description, stock, image: imagePath });
        await product.save();

        res.status(201).json({ message: "Product uploaded successfully", product });
    } catch (error) {
        console.error("Error in createProduct:", error);
        res.status(500).json({ error: "Failed to upload product" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, price, description, stock, image } = req.body;
        let imagePath = image || "";

        if (image && image.startsWith("data:image")) {
            const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
            const imageBuffer = Buffer.from(base64Data, "base64");
            const imageName = `${Date.now()}.png`;
            imagePath = `/uploads/${imageName}`;

            const uploadDir = path.join(__dirname, "..", "public", "uploads");
            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

            fs.writeFileSync(path.join(uploadDir, imageName), imageBuffer);
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description, stock, image: imagePath },
            { new: true }
        );

        if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

        res.json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update product" });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) return res.status(404).json({ error: "Product not found" });

        if (product.image) {
            const imagePath = path.join(__dirname, "..", "public", product.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete product" });
    }
};
