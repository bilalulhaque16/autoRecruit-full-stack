import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining Schema
const profile_visit_logSchema = new mongoose.Schema(
    {
        seeker_profile_id: {type: mongoose.Schema.Types.ObjectId, ref: "seeker_profile"},
        visit_date: Date,
        user_account_id: {type: mongoose.Schema.Types.ObjectId, ref: "user_account"},
        is_resume_downloaded: {type: Boolean, default: false},
        is_job_notification_sent: {type: Boolean, default: false},
        delete_status: {type: Boolean, default: false}
    },
    {timestamps: true}
  );
  
profile_visit_logSchema.plugin(mongoosePaginate);
  
  // Created model from schema
const profile_visit_log = mongoose.model("profile_visit_log", profile_visit_logSchema);
  
export default profile_visit_log;