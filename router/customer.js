import express from "express";
import { addCustomer, getCustomer } from "../controller/customer.js";
const app = express();

app.get("/login", getCustomer)
app.post("/register", addCustomer)

export default app;