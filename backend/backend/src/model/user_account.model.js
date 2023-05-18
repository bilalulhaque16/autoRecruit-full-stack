import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining Schema
const user_accountSchema = new mongoose.Schema(
    {
        user_type_id: {type: mongoose.Schema.Types.ObjectId, ref: "user_type"},
        full_name: String,
        email: String,
        password: String,
        date_of_birth: Date,
        gender: {type: String, enum: ['male', 'female']},
        is_active: {type: Boolean, default: false},
        contact_number: String,
        sms_notification_active: Boolean,
        email_notification_active: Boolean,
        // user_image: Blob,
        registration_date: Date,
        company_name: String,
        clientId: String,
        clientSecret: String,
        seeker_profile_id: {type: mongoose.Schema.Types.ObjectId, ref: "seeker_profile"},
        delete_status: {type: Boolean, default: false}

    },
    {timestamps: true}
  );
  
  user_accountSchema.plugin(mongoosePaginate);
  
  // Created model from schema
  const user_account = mongoose.model("user_account", user_accountSchema);
  
  export default user_account;