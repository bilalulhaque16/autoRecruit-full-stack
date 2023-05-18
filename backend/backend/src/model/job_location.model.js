import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining Schema
const job_locationSchema = new mongoose.Schema(
  {
    street_address: String,
    city: String,
    state: String,
    country: String,
    zip: String,
    delete_status: Boolean
  },
  { timestamps: true }
);

job_locationSchema.plugin(mongoosePaginate);

// Created model from schema
const job_location = mongoose.model("job_location", job_locationSchema);

export default job_location;
