const express = require("express");
const multer = require("multer");
const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/product-controller");

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });


router.get("/", getProducts);
router.post("/", upload.single("image"), createProduct); 
router.put("/:id", upload.single("image"), updateProduct); 
router.delete("/:id", deleteProduct);

module.exports = router;
