import express from "express";
import { login, logout, register } from "../controller/authController.js";
import { isUserUnique } from "../service/authService.js";

const authRouter = express.Router();

authRouter.post("/login", login).post("/register", isUserUnique,register).post("/logout" , logout);

export default authRouter;