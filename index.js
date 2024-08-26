import express from "express";
import mongoose from "mongoose";
import { RootRouterV1 } from "./src/routers/index.js";
import dotenv from "dotenv";
dotenv.config();

await mongoose.connect(process.env.MONGODB_CLOUD);
const app = express();
app.use(express.json());

app.use("/api/v1", RootRouterV1);
app.listen(1010, () => {
  console.log("server is running on port 1010");
});
