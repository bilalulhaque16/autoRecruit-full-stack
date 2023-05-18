import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining Schema
const job_post_actionSchema = new mongoose.Schema(
  {
    action_name: String,
    delete_status: Boolean
  },
  { timestamps: true }
);

job_post_actionSchema.plugin(mongoosePaginate);

// Created model from schema
const job_post_action = mongoose.model("job_post_action", job_post_actionSchema);

export default job_post_action;
