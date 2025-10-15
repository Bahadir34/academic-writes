import express from "express";
import mongoConfig from "./configs/mongodb-config.js";
import dotenvConfig from "./configs/dotenv-config.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
 import assayRouter from "./routes/assayRoutes.js";

dotenvConfig();
mongoConfig();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1", userRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", assayRouter);

app.listen(process.env.PORT, () => {
  console.log(`EXPRESS run on ${process.env.PORT} port`);
});
