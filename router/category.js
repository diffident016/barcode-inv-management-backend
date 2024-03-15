import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
} from "../controller/category.js";
const app = express();

app.get("/get/all", getAllCategories);
app.post("/add", addCategory);
app.get("/delete/:categoryId", deleteCategory);

export default app;
