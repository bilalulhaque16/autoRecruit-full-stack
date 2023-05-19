import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining Schema
const seeker_profileSchema = new mongoose.Schema(
  {
    user_account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_account",
    },
    personal_info: {
      first_name: String,
      middle_name: String,
      last_name: String,
      full_name: String,
      preferred_name: String,
      current_salary: Number,
      is_annually_monthly: String,
      currency: String,
      resume_url: String,
      country: String,
      city: String,
      address: String,
      postal_code: Number,
      age: Number,
      email: String,
      contact_number: String,
      links: [
        {
          platform: String,
          url: String,
        },
      ],
    },
    work_and_experience: {
      education_details: [
        { type: mongoose.Schema.Types.ObjectId, ref: "education_details" },
      ],
      experience_details: [
        { type: mongoose.Schema.Types.ObjectId, ref: "experience_details" },
      ],
      profile_visit_logs: [
        { type: mongoose.Schema.Types.ObjectId, ref: "profile_visit_log" },
      ],
      seeker_skill_sets: [
        { type: mongoose.Schema.Types.ObjectId, ref: "seeker_skill_set" },
      ],
      seeker_languages: [
        { type: mongoose.Schema.Types.ObjectId, ref: "seeker_language" },
      ],
      job_categories: [
        { type: mongoose.Schema.Types.ObjectId, ref: "job_category" },
      ],
      // seeker_skills: [
      //   { type: mongoose.Schema.Types.ObjectId, ref: "seeker_skill" },
      // ],
      seeker_skills: [
        {
          skill_name: String,
          skill_level: Number
        }
      ]
    },
    seeker_questions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "seeker_question" },
    ],
    delete_status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

seeker_profileSchema.plugin(mongoosePaginate);

// Created model from schema
const seeker_profile = mongoose.model("seeker_profile", seeker_profileSchema);

export default seeker_profile;
