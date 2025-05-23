import mongoose from "mongoose";

const userModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", userModel); 
