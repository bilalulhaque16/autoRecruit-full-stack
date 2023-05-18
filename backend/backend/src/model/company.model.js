import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining Schema
const companySchema = new mongoose.Schema(
  {
    company_name: String,
    profile_description: String,
    // business_stream_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user_account"
    // },
    establishment_date: Date,
    company_website_url: String,
    company_image_ref_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company_image",
    },
    phone_number: String,
    location: String,
    subtitle: String,
    delete_status: {type: Boolean, default: false}
  },
  { timestamps: true }
);

companySchema.plugin(mongoosePaginate);

// Created model from schema
const company = mongoose.model("company", companySchema);

export default company;
