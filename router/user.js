import express from "express";
import { addUser, getUser, getAllUsers } from "../controller/users.js";
const app = express();

app.get("/login/:authId", getUser);
app.get("/get/all", getAllUsers);
app.post("/register", addUser);

export default app;
