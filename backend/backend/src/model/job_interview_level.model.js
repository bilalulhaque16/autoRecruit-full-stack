import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining Schema
const job_interview_levelSchema = new mongoose.Schema(
  {
    level: String,
    delete_status: {type: Boolean, default: false}
  },
  { timestamps: true }
);

job_interview_levelSchema.plugin(mongoosePaginate);

// Created model from schema
const job_interview_level = mongoose.model("job_interview_level", job_interview_levelSchema);

export default job_interview_level;
