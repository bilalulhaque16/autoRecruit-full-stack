import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining Schema
const job_categorySchema = new mongoose.Schema(
  {
    name: String,
    date_created: {type: Date, default: new Date()},
    delete_status: {type: Boolean, default: false}
  },
  { timestamps: true }
);

job_categorySchema.plugin(mongoosePaginate);

// Created model from schema
const job_category = mongoose.model("job_category", job_categorySchema);

export default job_category;
