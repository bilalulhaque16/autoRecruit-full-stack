import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining Schema
const job_application_statusSchema = new mongoose.Schema(
  {
    status: String,
    delete_status: {type: Boolean, default: false}
  },
  { timestamps: true }
);

job_application_statusSchema.plugin(mongoosePaginate);

// Created model from schema
const job_application_status = mongoose.model("job_application_status", job_application_statusSchema);

export default job_application_status;
