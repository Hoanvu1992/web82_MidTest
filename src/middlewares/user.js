const UserMiddleware = {
  createUser: async (req, res, next) => {
    try {
      const { userName, email, password } = req.body;
      if (!userName) throw new Error("Bạn chưa nhập userName");
      if (!email) throw new Error("Bạn chưa nhập email");
      if (!password) throw new Error("Bạn chưa nhập mật khẩu");
      return next();
    } catch (error) {
      res.status(404).send({
        message: error.message,
        data: null,
      });
    }
  },

  getApiKey: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email) throw new Error("Bạn chưa nhập email");
      if (!password) throw new Error("Bạn chưa nhập mật khẩu");
      return next();
    } catch (error) {
      res.status(401).send({
        message: error.message,
        data: null,
      });
    }
  },
};

export default UserMiddleware;
