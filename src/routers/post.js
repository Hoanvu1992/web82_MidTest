import { Router } from "express";
import PostMiddleware from "../middlewares/post.js";
import PostController from "../controllers/post.js";

const PostRouter = Router();

PostRouter.post("", PostMiddleware.createPost, PostController.createPost);
PostRouter.put("/:id", PostMiddleware.updatePost, PostController.updatePost);

export default PostRouter;
