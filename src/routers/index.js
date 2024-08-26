import { Router } from "express";
import UserRouter from "./user.js";
import PostRouter from "./post.js";

const RootRouterV1 = Router();

RootRouterV1.use("/users", UserRouter);

RootRouterV1.use("/posts", PostRouter);

export { RootRouterV1 };
