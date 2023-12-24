import express from "express";
const app = express();
import {
    addProduct,
    getAllProducts,
    deleteSelectedProduct,
    updateSelectedProduct,
    searchProduct
} from "../controller/product.js";

// Add Product
app.post("/add", addProduct);

// Get All Products
app.get("/get/:userId", getAllProducts);

// Delete Selected Product Item
app.get("/delete/:id", deleteSelectedProduct);

// Update Selected Product
app.post("/update", updateSelectedProduct);

// Search Product
app.get("/search", searchProduct);


export default app;
