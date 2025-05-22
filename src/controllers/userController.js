import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const newUserController = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber, age } = req.body;

    const validUser = await User.findOne({ email: email });

    if (validUser) {
      throw new Error("User already exists in the database");
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      age,
    });

    await newUser.save();

    const token = jwt.sign({ token: newUser._id }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.json({
      success: true,
      message: "new user created successfully",
    });
  } catch (e) {
    next(e);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });    

    if (!user) {
      throw new Error("User not Found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    res.json({
      success: true,
      message: "Login successfull",
    });

  } catch (e) {
    next(e);
  }
};
