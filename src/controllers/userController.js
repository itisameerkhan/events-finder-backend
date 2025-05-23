import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";

export const signupController = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber, age } = req.body;

    const validUser = await User.findOne({ email: email });

    if (validUser) {
      throw new Error("User already exists in the database");
    }

    if (name === "") {
      throw new Error("Field name is required");
    }
    if (age == "") {
      throw new Error("Field Age is required");
    }
    if (phoneNumber == "") {
      throw new Error("Phone number is required");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error("Password is not strong enough");
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

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

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
    
    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }
    
    const user = await User.findOne({ email });    
    
    if (!user) {
      throw new Error("User not Found");
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
        
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);    

    res.cookie("token", token);    

    res.json({
      success: true,
      message: "Login successfull",
    });

  } catch (e) {
    next(e);
  }
};

export const logoutController = (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });

    res.json({
      success: true,
      message: "logout successfull",
    });

  } catch (e) {
    next(e);
  }
};
