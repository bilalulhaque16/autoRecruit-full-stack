import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining Schema
const languageSchema = new mongoose.Schema(
  {
    seeker_profile_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seeker_profile",
    },
    language: String,
    fluent: { type: Boolean, default: false },
    reading_proficiency: {
      type: String,
      enum: ["beginner", "intermediate", "expert"]
    },
    speaking_proficiency: {
      type: String,
      enum: ["beginner", "intermediate", "expert"]
    },
    delete_status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

languageSchema.plugin(mongoosePaginate);

// Created model from schema
const language = mongoose.model("seeker_language", languageSchema);

export default language;
