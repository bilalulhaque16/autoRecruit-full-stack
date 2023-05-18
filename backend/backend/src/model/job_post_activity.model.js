import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"

// Defining Schema
const job_post_activitySchema = new mongoose.Schema(
  {
    user_account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_account",
    },
    job_post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job_post",
    },
    apply_date: Date,
    // job_application_status_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "job_application_status",
    // },
    job_application_status: {
      type: String,
      enum: ["accepted", "pending", "invited", "rejected", "on_going"],
      default: "pending",
    },
    job_interview_level_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job_interview_level",
    },
    seeker_profile_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seeker_profile",
    },
    delete_status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// job_post_activitySchema.plugin(mongoosePaginate);
job_post_activitySchema.plugin(aggregatePaginate);


// Created model from schema
const job_post_activity = mongoose.model(
  "job_post_activity",
  job_post_activitySchema
);

export default job_post_activity;
