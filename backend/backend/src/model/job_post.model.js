import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"

// Defining Schema
const job_postSchema = new mongoose.Schema(
  {
    posted_by_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_account",
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
    },
    job_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job_category",
    },
    job_title: String,
    job_status: { type: String, enum: ["active", "unactive"] },
    skills: [
      {
        skill_level: Number,
        skill_set_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "skill_set",
        },
      },
    ],
    job_shift: { type: String, enum: ["morning", "evening", "night"] },
    job_type: {
      type: String,
      enum: [
        "full-time",
        "part-time",
        "contract",
        "temporary",
        "freelancer",
        "intern",
        "on-call",
        "visiting",
      ],
    },
    locations: [
      {
        job_location_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "job_location",
        },
      },
    ],
    job_location_type: { type: String, enum: ["on-site", "hybrid", "remote"] },
    experience: {
      type: String,
      enum: ["0-1year", "1-3year", "<5year", "<10year"],
    },
    job_description: String,
    is_company_name_hidden: Boolean,
    created_date: { type: Date, default: new Date() },
    publish_status: {type: String, enum: ['publish', 'draft'], default: 'draft'},
    delete_status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// job_postSchema.plugin(mongoosePaginate);
job_postSchema.plugin(aggregatePaginate);




// Created model from schema
const job_post = mongoose.model("job_post", job_postSchema);

export default job_post;
