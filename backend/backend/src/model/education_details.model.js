import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining Schema
const education_detailsSchema = new mongoose.Schema(
    {
        seeker_profile_id: {type: mongoose.Schema.Types.ObjectId, ref: "seeker_profile"},
        certificate_degree_name: String,
        institute_university_name: String,
        field_of_study: String,
        starting_date: Date,
        completion_date: Date,
        percentage: Number,
        cgpa: Number,
        delete_status: {type: Boolean, default: false}
    },
    {timestamps: true}
  );
  
education_detailsSchema.plugin(mongoosePaginate);
  
  // Created model from schema
const education_details = mongoose.model("education_details", education_detailsSchema);
  
export default education_details;