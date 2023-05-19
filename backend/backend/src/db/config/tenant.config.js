import mongoose from "mongoose"
mongoose.Promise = global.Promise;

import "../../model/role.model.js";
import "../../model/role_group.model.js";
import "../../model/company.model.js";
import "../../model/company_image.model.js";
import "../../model/education_details.model.js";
import "../../model/experience_details.model.js";
import "../../model/job_application_status.model.js";
import "../../model/job_location.model.js";
import "../../model/job_post.model.js";
import "../../model/job_post_action.model.js";
import "../../model/job_post_activity.model.js";
import "../../model/job_post_activity_log.model.js";
import "../../model/job_post_skill_set.model.js";
import "../../model/job_category.model.js";
import "../../model/otp.model.js";
import "../../model/profile_visit_log.model.js";
import "../../model/seeker_profile.model.js";
import "../../model/seeker_skill_set.model.js";
import "../../model/skill_set.model.js";
import "../../model/token.model.js";
import "../../model/user_account.model.js";
import "../../model/user_log.model.js";
import "../../model/user_type.model.js";
import "../../model/seeker_language.model.js";
import "../../model/seeker_question.model.js";
import "../../model/job_interview_level.model.js";
import "../../model/job_invitation_box.model.js";

const clientOption = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 1,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  console.log("-------- Mongoose default connection open -------");
});

// If the connection throws an error
mongoose.connection.on("error", err => {
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

const initTenantDbConnection = DB_URL => {
  try {
    const db = mongoose.createConnection(DB_URL, clientOption);

    db.on(
      "error",
      console.error.bind(
        console,
        "initTenantDbConnection MongoDB Connection Error>> : "
      )
    );
    db.once("open", () => {
      console.log("-------- initTenantDbConnection client MongoDB Connection ok! -------");
    });

    // require all schemas !?
    return db;
  } catch (error) {
    console.log("initTenantDbConnection error", error);
  }
};

export {initTenantDbConnection};