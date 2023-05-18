import mongoose from "mongoose";

// Defining Schema
const user_logSchema = new mongoose.Schema(
    {
        user_account_id: {type: mongoose.Schema.Types.ObjectId, ref: "user_account"},
        last_login_date: Date,
        last_job_apply_date: Date,
        delete_status: {type: Boolean, default: false}
    },
    {timestamps: true}
  );
  

// Created model from schema
const user_log = mongoose.model("user_log", user_logSchema);

export default user_log;