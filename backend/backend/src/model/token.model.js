import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
    {
      token: String,
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user_account"
      }
    },
    {timestamps: true}
  );
  

// Created model from schema
const refresh_tokens = mongoose.model("refresh_tokens", refreshTokenSchema);

export default refresh_tokens;
