import express from "express";
const app = express();
import { addStore, getAllStores } from "../controller/store.js";

// Add Store 
app.post("/add", addStore);

// Get All Store
app.get("/get/:userID", getAllStores)

export default app;
