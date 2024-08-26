const PostMiddleware = {
  createPost: async (req, res, next) => {
    try {
      const { userId, content } = req.body;
      if (!userId) throw new Error("Không xác thực được người dùng");
      if (!content) throw new Error("Không có nội dung bài viết");
      return next();
    } catch (error) {
      res.status(403).send({
        message: error.message,
      });
    }
  },

  updatePost: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { apiKey } = req.query;
      if (!apiKey) throw new Error("Bạn cần có API Key");
      const { content } = req.body;
      if (!id) throw new Error("Không xác thực được bài viết");
      if (!content) throw new Error("Không có nội dung bài viết");
      return next();
    } catch (error) {
      res.status(403).send({
        message: error.message,
      });
    }
  },
};

export default PostMiddleware;
