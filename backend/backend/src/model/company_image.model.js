import mongoose from "mongoose";

// Defining Schema
const company_imageSchema = new mongoose.Schema(
  {
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company"
    },
    company_image: Array,
    delete_status: {type: Boolean, default: false}
  },
  {timestamps: true}
);

// Created model from schema
const company_image = mongoose.model("company_image", company_imageSchema);

export default company_image;