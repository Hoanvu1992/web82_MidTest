import { Router } from "express";
import UserController from "../controllers/user.js";
import UserMiddleware from "../middlewares/user.js";

const UserRouter = Router();

UserRouter.post(
  "/register",
  UserMiddleware.createUser,
  UserController.createUser
);

UserRouter.post("/login", UserMiddleware.getApiKey, UserController.getApiKey);

export default UserRouter;
