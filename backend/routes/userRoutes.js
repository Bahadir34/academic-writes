import express from "express";
import { getAllUsers } from "../controller/userController.js";
import { tokenValidation } from "../middlewares/authMiddleware.js";
 

const userRouter = express.Router();

userRouter.get("/user", tokenValidation,getAllUsers);

export default userRouter;