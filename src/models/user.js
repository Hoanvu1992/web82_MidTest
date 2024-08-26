import mongoose from "mongoose";
import Collections from "../database/collection.js";
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const UserModel = mongoose.model(Collections.users, userSchema);

export default UserModel;
