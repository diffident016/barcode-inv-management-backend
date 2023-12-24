import express from "express";
const app = express();
import { addSales, getSalesData, getMonthlySales, getTotalSalesAmount } from "../controller/sales.js";

// Add Sales
app.post("/add", addSales);

// Get All Sales
app.get("/get/:userID", getSalesData);
app.get("/getmonthly", getMonthlySales);


app.get("/get/:userID/totalsaleamount", getTotalSalesAmount);

export default app;