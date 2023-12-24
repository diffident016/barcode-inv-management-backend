import express from "express";
import { addUser, getUser } from "../controller/users.js";
const app = express();

app.get("/login/:authId", getUser)
app.post("/register", addUser)

export default app;