import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining Schema
const experience_detailsSchema = new mongoose.Schema(
    {
        seeker_profile_id: {type: mongoose.Schema.Types.ObjectId, ref: "seeker_profile"},
        is_current_job: Boolean,
        start_date: Date,
        end_date: Date,
        job_title: String,
        company_name: String,
        job_location_city: String,
        job_location_state: String,
        job_location_country: String,
        description: String,
        delete_status: {type: Boolean, default: false}

    },
    {timestamps: true}
  );
  
experience_detailsSchema.plugin(mongoosePaginate);
  
  // Created model from schema
const experience_details = mongoose.model("experience_details", experience_detailsSchema);
  
export default experience_details;