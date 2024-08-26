import listApiKeys from "../../data.js";
import UserModel from "../models/user.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

const UserController = {
  createUser: async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      const existEmail = await UserModel.findOne({ email: email });
      if (existEmail) throw new Error("Email đã tồn tại");
      const existUser = await UserModel.findOne({ userName: userName });
      if (existUser) throw new Error("Tài khoản đã tồn tại");
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = await UserModel.create({
        userName,
        email,
        password: hash,
      });
      res.status(201).send({
        message: "Thành công!",
        data: newUser,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  },

  getApiKey: async (req, res) => {
    try {
      const { email, password } = req.body;
      const crrUser = await UserModel.findOne({ email });
      if (!crrUser) throw new Error("Không xác thực được thông tin");
      const comparePassword = bcrypt.compareSync(password, crrUser.password);
      if (!comparePassword) throw new Error("Sai tài khoản hoặc mật khẩu");
      //Logic tìm và xóa apiKey bị trùng với trường email và _id
      const findExistKey = listApiKeys.findIndex(
        (item) =>
          String(item.includes(crrUser.email)) &&
          String(item.includes(crrUser._id)) &&
          String(item.includes(crrUser.password))
      );
      if (findExistKey >= 0) {
        listApiKeys.splice(findExistKey, 1);
      }
      //Tạo khóa ApiKey  mới dựa trên ID và email người dùng
      const randomString = crypto.randomUUID();
      const generateApiKey = `mern-$${crrUser._id}$-$${crrUser.email}$-$${randomString}$`;
      listApiKeys.push(generateApiKey);
      res.status(200).send({
        message: "Thành công!",
        data: listApiKeys,
      });
      console.log(listApiKeys);
    } catch (error) {
      res.status(401).send({
        message: error.message,
      });
    }
  },
};

export default UserController;
