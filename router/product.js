import express from "express";
const app = express();
import {
    addProduct,
    getAllProducts,
    deleteSelectedProduct,
    updateSelectedProduct,
    searchProduct
} from "../controller/product.js";


app.post("/add", addProduct);
app.get("/get/:storeID", getAllProducts);
app.get("/delete/:productID", deleteSelectedProduct);
app.post("/update", updateSelectedProduct);
app.get("/search", searchProduct);

export default app;
