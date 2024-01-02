import express from "express";
import { addCustomer, getAllCustomer, getCustomer } from "../controller/customer.js";
const app = express();

app.post("/login", getCustomer)
app.post("/register", addCustomer)
app.get("/get/all", getAllCustomer)

export default app;