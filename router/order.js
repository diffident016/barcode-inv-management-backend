import express from "express";
import {
    addOrder,
    cancelOrder,
    checkoutOrder,
    completeOrder,
    getAllOrder,
    getMyCart,
    getMyOrder,
    removeOrder,
    updateQuantity
} from "../controller/order.js";

const app = express();

app.post("/add", addOrder)
app.get("/cart/get/:customerID", getMyCart)
app.get("/get/:customerID", getMyOrder)
app.get("/get/all/:storeID", getAllOrder)
app.post("/update/quantity", updateQuantity)
app.get("/remove/:orderID", removeOrder)
app.post("/checkout", checkoutOrder)
app.post("/cancel", cancelOrder)
app.post("/complete", completeOrder)

export default app;