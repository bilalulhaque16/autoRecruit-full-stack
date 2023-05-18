import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining Schema
const job_invitationSchema = new mongoose.Schema(
  {
    seeker_profile_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seeker_profile"
    },
    job_post_activity_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job_post_activity"
    },
    date_created: {type: Date, default: new Date()},
    message: String,
    // invitations: [
    //   {
        // job_post_id: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: "job_post"
        // },
    //     // message: String
    //     messages: [
    //       {
    //         message: String
    //       }
    //     ]  
    //   }
    // ],
    delete_status: {type: Boolean, default: false}
  },
  { timestamps: true }
);

job_invitationSchema.plugin(mongoosePaginate);

// Created model from schema
const job_invitation = mongoose.model("job_invitation", job_invitationSchema);

export default job_invitation;