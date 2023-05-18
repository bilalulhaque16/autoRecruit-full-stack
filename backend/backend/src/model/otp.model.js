import mongoose from "mongoose";

// Defining Schema
const otpSchema = new mongoose.Schema(
  {
    otp: String,
    createdAt: Date,
    expiresAt: Date,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_account"
    }
  }
);

// Created model from schema
const user_otp = mongoose.model("user_otp", otpSchema);

export default user_otp;