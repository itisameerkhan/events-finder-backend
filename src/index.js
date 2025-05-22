import express from "express";
import dotenv from "dotenv";
import userRoute from "./routers/userRoute.js";
import { connectDB } from "./config/dbConnect.js";
import { errorHandler } from "./config/errorHandler.js";
import cookieParser from "cookie-parser";

const app = express(); 
dotenv.config();
app.use(express.json());
app.use(cookieParser());

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("server is listening to PORT: ", process.env.PORT);
  });
});

app.use("/user", userRoute);
app.use(errorHandler)
