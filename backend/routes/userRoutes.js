import express from "express";
import { getAllUsers, userCount } from "../controller/userController.js";
import { tokenValidation } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter
  .get("/user", tokenValidation, getAllUsers)
  .get("/number-of-users", userCount);

export default userRouter;
