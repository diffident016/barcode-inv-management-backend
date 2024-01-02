import express from "express";
import { getAllSales } from "../controller/sales.js";
const app = express();

app.get("/get/all/:storeID", getAllSales)

export default app;