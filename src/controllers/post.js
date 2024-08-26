import UserModel from "../models/user.js";
import PostModel from "../models/post.js";
import listApiKeys from "../../data.js";

const PostController = {
  createPost: async (req, res) => {
    try {
      const { apiKey } = req.query;
      if (!apiKey) throw new Error("Bạn cần có API Key");
      const { userId, content } = req.body;
      const crrUser = await UserModel.findById({ _id: userId });
      if (!crrUser) throw new Error("Không tìm thấy User");
      if (apiKey == listApiKeys) {
        const newPost = await PostModel.create({
          userId: crrUser._id,
          content,
        });
        res.status(201).send({
          message: "Tạo bài viết thành công",
          data: newPost,
        });
      } else {
        res.status(401).send({
          message: "API Key không hợp lệ",
        });
      }
      console.log(listApiKeys);
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const { apiKey } = req.query;
      const { content } = req.body;
      const crrPost = await PostModel.findById({ _id: id });
      if (!crrPost) throw new Error("Không tìm thấy bài viết");
      if (apiKey == listApiKeys) {
        await PostModel.updateOne({ _id: id }, { content });
        res.status(200).send({
          message: "Cập nhật bài viết thành công",
          data: crrPost,
        });
      } else {
        res.status(401).send({
          message: "API Key không hợp lệ",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },
};

export default PostController;
