import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining Schema
const job_post_skill_setSchema = new mongoose.Schema(
  {
    job_post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job_post"
    },
    skill_level: Number,
    delete_status: Boolean
  },
  { timestamps: true }
);

job_post_skill_setSchema.plugin(mongoosePaginate);

// Created model from schema
const job_post_skill_set = mongoose.model("job_post_skill_set", job_post_skill_setSchema);

export default job_post_skill_set;
