const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");

dotenv.config();
connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use(fileUpload()); 


app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));




app.use("/api/products", require("./routes/product-routes"));
app.use("/api/cart", require("./routes/cart-routes"));
app.use("/api/checkout", require("./routes/checkout-routes"));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
