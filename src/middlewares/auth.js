import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const auth = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;

    const tokenContent = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(tokenContent.userId);    

    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
};
