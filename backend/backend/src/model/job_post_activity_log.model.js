import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining Schema
const job_post_activity_logSchema = new mongoose.Schema(
  {
    job_post_activity_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job_post_activity"
    },
    job_post_action_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job_post_action"
    },
    action_date: Date,
    user_account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_account",
    },
    delete_status: Boolean
  },
  { timestamps: true }
);

job_post_activity_logSchema.plugin(mongoosePaginate);

// Created model from schema
const job_post_activity_log = mongoose.model("job_post_activity_log", job_post_activity_logSchema);

export default job_post_activity_log;
