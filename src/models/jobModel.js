import mongoose from "mongoose";

const jobModel = mongoose.Schema({
  imageURL: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  startingDate: {
    type: Date,
    required: true,
  },
  endingDate: {
    type: Date,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const Job = mongoose.model("Job", jobModel);
