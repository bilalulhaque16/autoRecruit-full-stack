import mongoose from "mongoose";

// Defining Schema
const user_typeSchema = new mongoose.Schema(
    {
        user_type_name: String,
        delete_status: Boolean
    },
    {timestamps: true}
  );
  

// Created model from schema
const user_type = mongoose.model("user_type", user_typeSchema);

export default user_type;