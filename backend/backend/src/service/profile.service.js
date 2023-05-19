import { BlobServiceClient } from "@azure/storage-blob";
import getStream from "into-stream";

// Util files imports
import getBlobName from "../util/upload/blob_name.util.js";

// Status code file import
import * as status_codes from "../util/status_codes.util.js";

// Importing db calls
import {
  getAllData,
  createSeekerProfileData,
  getSpecificData,
  updateSpecificData,
  createSeekerProfileEducationDetails,
  createSeekerProfileExperienceDetails,
  createSeekerProfileVisitLog,
  createSeekerSkillSet,
  createSkillSet,
  createBulk,
  getSpecificDataAllDetails,
  createSeekerLanguage,
  createSeekerQuestion,
  // createSeekerSkill
} from "../util/db_calls/profile.calls.js";

// Seeker profile
const readAllSeekerProfileService = async (tenantDbConnection, request) => {
  const { page, perPage } = request.query;
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(perPage) || 50,
    select: "-createdAt -updatedAt -__v -delete_status",
    populate: [
      {
        path: "user_account_id",
        select: "-_id full_name email date_of_birth gender contact_number",
      },
      {
        path: "work_and_experience.education_details",
        select:
          "certificate_degree_name institute_university_name starting_date completion_date percentage cgpa field_of_study",
      },
      {
        path: "work_and_experience.experience_details",
        select:
          "is_current_job start_date end_date job_title description company_name job_location_city job_location_state job_location_country",
      },
      {
        path: "work_and_experience.profile_visit_logs",
        select: "visit_date is_resume_downloaded is_job_notification_sent",
      },
      {
        path: "work_and_experience.seeker_languages",
        select: "fluent language reading_proficiency speaking_proficiency",
      },
      {
        path: "work_and_experience.job_categories"
      },
      {
        path: "work_and_experience.seeker_skill_sets",
        select: "skill_level",
        populate: {
          path: "skill_set_id",
          select: "skill_set_name",
        },
      },
      {
        path: "seeker_questions",
        select: "ques ans",
      },
    ],
  };

  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");
  const foundData = await getAllData(Seeker_Profile, {}, options);

  if (!foundData.totalDocs) {
    return status_codes.recordNotFound(foundData);
  } else {
    return status_codes.OK(foundData);
  }
};

const createSeekerProfileService = async (tenantDbConnection, request) => {
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");

  const profile = await getSpecificData(Seeker_Profile, {
    user_account_id: request.user.id,
  });
  if (profile) return status_codes.conflict("Profile already exists");

  createSeekerProfileData(Seeker_Profile, request);
  return status_codes.recordCreated();
};

const readSeekerProfileService = async (tenantDbConnection, request) => {
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");

  const profile = await getSpecificDataAllDetails(
    Seeker_Profile,
    {
      _id: request.params.id,
      delete_status: false,
    },
    [
      {
        path: "user_account_id",
        select: "-_id full_name email date_of_birth gender contact_number",
      },
      {
        path: "work_and_experience.education_details",
        select:
          "certificate_degree_name institute_university_name starting_date completion_date percentage cgpa field_of_study",
      },
      {
        path: "work_and_experience.experience_details",
        select:
          "is_current_job start_date end_date job_title description company_name job_location_city job_location_state job_location_country",
      },
      // {
      //   path: "work_and_experience.profile_visit_logs",
      //   select: "visit_date is_resume_downloaded is_job_notification_sent",
      // },
      // {
      //   path: "work_and_experience.seeker_skill_sets",
      //   select: "skill_level skill_set_id",
      //   populate: {
      //     path: "skill_set_id",
      //     select: "skill_set_name",
      //   },
      // },
      {
        path: "work_and_experience.job_categories",
        select: "name"
      },
      {
        path: "work_and_experience.seeker_languages",
        select: "fluent language reading_proficiency speaking_proficiency",
      },
      {
        path: "seeker_questions",
        select: "ques ans",
      },
    ],
    "-createdAt -updatedAt -__v -delete_status -work_and_experience.profile_visit_logs -work_and_experience.seeker_skill_sets"
  );

  if (!profile) return status_codes.recordNotFound(profile);

  return status_codes.OK(profile);
};

const updateSeekerProfileService = async (tenantDbConnection, request) => {
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");

  let update_fields = {};
  for (var i in request.body.personal_info) {
    update_fields["personal_info."+i] = request.body.personal_info[i]
  }


  const profile = await updateSpecificData(
    Seeker_Profile,
    { _id: request.params.id, delete_status: false },
    { $set: update_fields }
    // { $set: { 'personal_info.first_name': 'name'} }
    // { $set: { 'personal_info': request.body} }
  );
  if (!profile) return status_codes.recordNotFound(profile);

  return status_codes.OK("Profile updated successfully");
};

const deleteSeekerProfileService = async (tenantDbConnection, request) => {
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");

  const profile = await updateSpecificData(
    Seeker_Profile,
    { _id: request.params.id, delete_status: false },
    { delete_status: true }
  );
  if (!profile) return status_codes.recordNotFound(profile);

  return status_codes.OK("Profile deleted successfully");
};

// Seeker education details
const createSeekerEducationDetailsService = async (
  tenantDbConnection,
  request
) => {
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");
  const Education_Details = await tenantDbConnection.model("education_details");

  const profile = await getSpecificData(Seeker_Profile, {
    user_account_id: request.user.id,
    delete_status: false,
  });
  const eduData = await createSeekerProfileEducationDetails(
    Education_Details,
    request,
    profile._id
  );

  await updateSpecificData(
    Seeker_Profile,
    { _id: profile._id },
    { $push: { "work_and_experience.education_details": eduData._id } }
  );
  return status_codes.recordCreated();
};

const readAllSeekerEducationDetailsService = async (
  tenantDbConnection,
  request
) => {
  const { page, perPage } = request.query;
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");
  const Education_Details = await tenantDbConnection.model("education_details");
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(perPage) || 50,
    populate: [
      {
        path: "seeker_profile_id",
        select:
          "first_name last_name current_salary is_annually_monthly currency",
      },
    ],
  };

  const profile = await getSpecificData(Seeker_Profile, {
    user_account_id: request.user.id,
    delete_status: false,
  });

  const foundData = await getAllData(
    Education_Details,
    { seeker_profile_id: profile._id, delete_status: false },
    options
  );

  if (!foundData.totalDocs) {
    return status_codes.recordNotFound(foundData);
  } else {
    return status_codes.OK(foundData);
  }
};

const readSeekerEducationDetailsService = async (
  tenantDbConnection,
  request
) => {
  const Education_Details = await tenantDbConnection.model("education_details");
  const data = await getSpecificData(Education_Details, {
    _id: request.params.id,
    delete_status: false,
  });
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK(data);
};

const updateSeekerEducationDetailsService = async (
  tenantDbConnection,
  request
) => {
  const Education_Details = await tenantDbConnection.model("education_details");

  const data = await updateSpecificData(
    Education_Details,
    { _id: request.params.id, delete_status: false },
    { $set: request.body }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Updated successfully");
};

const deleteSeekerEducationDetailsService = async (
  tenantDbConnection,
  request
) => {
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");
  const Education_Details = await tenantDbConnection.model("education_details");

  const profile = await getSpecificData(Seeker_Profile, {
    user_account_id: request.user.id,
    delete_status: false,
  });

  const data = await updateSpecificData(
    Education_Details,
    { _id: request.params.id, delete_status: false },
    { delete_status: true }
  );
  if (!data) return status_codes.recordNotFound(data);

  await updateSpecificData(
    Seeker_Profile,
    { _id: profile._id },
    { $pull: { "work_and_experience.education_details": request.params.id } }
  );

  return status_codes.OK("Deleted successfully");
};

// Seeker experience details
const createSeekerExperienceDetailsService = async (
  tenantDbConnection,
  request
) => {
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");
  const Experience_Details = await tenantDbConnection.model(
    "experience_details"
  );
  const profile = await getSpecificData(Seeker_Profile, {
    user_account_id: request.user.id,
    delete_status: false,
  });
  const expData = await createSeekerProfileExperienceDetails(
    Experience_Details,
    request,
    profile._id
  );

  await updateSpecificData(
    Seeker_Profile,
    { _id: profile._id },
    { $push: { "work_and_experience.experience_details": expData._id } }
  );

  return status_codes.recordCreated();
};

const readAllSeekerExperienceDetailsService = async (
  tenantDbConnection,
  request
) => {
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");
  const Experience_Details = await tenantDbConnection.model(
    "experience_details"
  );
  const { page, perPage } = request.query;
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(perPage) || 50,
    populate: [
      {
        path: "seeker_profile_id",
        select:
          "first_name last_name current_salary is_annually_monthly currency",
      },
    ],
  };

  const profile = await getSpecificData(Seeker_Profile, {
    user_account_id: request.user.id,
    delete_status: false,
  });
  const foundData = await getAllData(
    Experience_Details,
    { seeker_profile_id: profile._id, delete_status: false },
    options
  );

  if (!foundData.totalDocs) {
    return status_codes.recordNotFound(foundData);
  } else {
    return status_codes.OK(foundData);
  }
};

const readSeekerExperienceDetailsService = async (
  tenantDbConnection,
  request
) => {
  const Experience_Details = await tenantDbConnection.model(
    "experience_details"
  );
  const data = await getSpecificData(Experience_Details, {
    _id: request.params.id,
    delete_status: false,
  });
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK(data);
};

const updateSeekerExperienceDetailsService = async (
  tenantDbConnection,
  request
) => {
  const Experience_Details = await tenantDbConnection.model(
    "experience_details"
  );

  const data = await updateSpecificData(
    Experience_Details,
    { _id: request.params.id, delete_status: false },
    { $set: request.body }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Updated successfully");
};

const deleteSeekerExperienceDetailsService = async (
  tenantDbConnection,
  request
) => {
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");
  const Experience_Details = await tenantDbConnection.model(
    "experience_details"
  );

  const profile = await getSpecificData(Seeker_Profile, {
    user_account_id: request.user.id,
    delete_status: false,
  });

  const data = await updateSpecificData(
    Experience_Details,
    { _id: request.params.id, delete_status: false },
    { delete_status: true }
  );
  if (!data) return status_codes.recordNotFound(data);

  await updateSpecificData(
    Seeker_Profile,
    { _id: profile._id },
    { $pull: { "work_and_experience.experience_details": request.params.id } }
  );
  return status_codes.OK("Deleted successfully");
};

// Profile visit log
const createSeekerProfileVisitLogService = async (
  tenantDbConnection,
  request
) => {
  const Profile_Visit_Log = await tenantDbConnection.model("profile_visit_log");
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");

  const profile = await getSpecificData(Seeker_Profile, {
    user_account_id: request.user.id,
    delete_status: false,
  });
  const visitLog = await createSeekerProfileVisitLog(
    Profile_Visit_Log,
    request,
    profile._id
  );

  await updateSpecificData(
    Seeker_Profile,
    { _id: profile._id },
    { $push: { profile_visit_log_id: visitLog._id } }
  );

  return status_codes.recordCreated();
};

const readAllSeekerProfileVisitLogService = async (
  tenantDbConnection,
  request
) => {
  const Profile_Visit_Log = await tenantDbConnection.model("profile_visit_log");
  const { page, perPage } = request.query;
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(perPage) || 50,
    populate: [
      {
        path: "seeker_profile_id",
        select:
          "first_name last_name current_salary is_annually_monthly currency",
      },
    ],
  };

  // const profile = await getSpecificData(seeker_profile, {
  //   user_account_id: request.user.id,
  //   delete_status: false,
  // });
  const foundData = await getAllData(
    Profile_Visit_Log,
    { user_account_id: request.user.id, delete_status: false },
    {},
    options
  );

  if (!foundData.totalDocs) {
    return status_codes.recordNotFound(foundData);
  } else {
    return status_codes.OK(foundData);
  }
};

const readSeekerProfileVisitLogService = async (
  tenantDbConnection,
  request
) => {
  const Profile_Visit_Log = await tenantDbConnection.model("profile_visit_log");

  const data = await getSpecificData(Profile_Visit_Log, {
    _id: request.params.id,
    delete_status: false,
  });
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK(data);
};

const updateSeekerProfileVisitLogService = async (
  tenantDbConnection,
  request
) => {
  const Profile_Visit_Log = await tenantDbConnection.model("profile_visit_log");

  const data = await updateSpecificData(
    Profile_Visit_Log,
    { _id: request.params.id, delete_status: false },
    { $set: request.body }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Updated successfully");
};

const deleteSeekerProfileVisitLogService = async (
  tenantDbConnection,
  request
) => {
  const Profile_Visit_Log = await tenantDbConnection.model("profile_visit_log");

  const data = await updateSpecificData(
    Profile_Visit_Log,
    { _id: request.params.id, delete_status: false },
    { delete_status: true }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Deleted successfully");
};

// Seeker skill set
const createSeekerSkillSetService = async (tenantDbConnection, request) => {
  const Seeker_Skill_Set = await tenantDbConnection.model("seeker_skill_set");
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");

  const profile = await getSpecificData(Seeker_Profile, {
    user_account_id: request.user.id,
    delete_status: false,
  });
  const skillSet = await createSeekerSkillSet(
    Seeker_Skill_Set,
    request,
    profile._id
  );

  await updateSpecificData(
    Seeker_Profile,
    { _id: profile._id },
    { $push: { "work_and_experience.seeker_skill_sets": skillSet._id } }
  );

  return status_codes.recordCreated();
};

const readAllSeekerSkillSetService = async (tenantDbConnection, request) => {
  const Seeker_Skill_Set = await tenantDbConnection.model("seeker_skill_set");

  const { page, perPage } = request.query;
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(perPage) || 50,
    populate: [
      {
        path: "seeker_profile_id",
        select:
          "first_name last_name current_salary is_annually_monthly currency",
      },
      {
        path: "skill_set_id",
      },
    ],
  };

  // const profile = await getSpecificData(seeker_profile, {
  //   user_account_id: request.user.id,
  //   delete_status: false,
  // });

  const foundData = await getAllData(Seeker_Skill_Set, {}, options);

  if (!foundData.totalDocs) {
    return status_codes.recordNotFound(foundData);
  } else {
    return status_codes.OK(foundData);
  }
};

const readSeekerSkillSetService = async (tenantDbConnection, request) => {
  const Seeker_Skill_Set = await tenantDbConnection.model("seeker_skill_set");

  const data = await getSpecificData(Seeker_Skill_Set, {
    _id: request.params.id,
    delete_status: false,
  });
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK(data);
};

const updateSeekerSkillSetService = async (tenantDbConnection, request) => {
  const Seeker_Skill_Set = await tenantDbConnection.model("seeker_skill_set");

  const data = await updateSpecificData(
    Seeker_Skill_Set,
    { _id: request.params.id, delete_status: false },
    { $set: request.body }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Updated successfully");
};

const deleteSeekerSkillSetService = async (tenantDbConnection, request) => {
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");
  const Seeker_Skill_Set = await tenantDbConnection.model("seeker_skill_set");

  const profile = await getSpecificData(Seeker_Profile, {
    user_account_id: request.user.id,
    delete_status: false,
  });

  const data = await updateSpecificData(
    Seeker_Skill_Set,
    { _id: request.params.id, delete_status: false },
    { delete_status: true }
  );
  if (!data) return status_codes.recordNotFound(data);

  await updateSpecificData(
    Seeker_Profile,
    { _id: profile._id },
    { $pull: { "work_and_experience.seeker_skill_sets": request.params.id } }
  )
  return status_codes.OK("Deleted successfully");
};

// Seeker language
const createSeekerLanguageService = async (tenantDbConnection, request) => {
  const Seeker_Language = await tenantDbConnection.model("seeker_language");
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");

  const profile = await getSpecificData(Seeker_Profile, {
    user_account_id: request.user.id,
    delete_status: false,
  });
  const skillLanguage = await createSeekerLanguage(
    Seeker_Language,
    request,
    profile._id
  );

  await updateSpecificData(
    Seeker_Profile,
    { _id: profile._id },
    { $push: { "work_and_experience.seeker_languages": skillLanguage._id } }
  );

  return status_codes.recordCreated();
};

const readAllSeekerLanguageService = async (tenantDbConnection, request) => {
  const Seeker_Language = await tenantDbConnection.model("seeker_language");

  const { page, perPage } = request.query;
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(perPage) || 50,
  };

  // const profile = await getSpecificData(seeker_profile, {
  //   user_account_id: request.user.id,
  //   delete_status: false,
  // });

  const foundData = await getAllData(Seeker_Language, {}, options);

  if (!foundData.totalDocs) {
    return status_codes.recordNotFound(foundData);
  } else {
    return status_codes.OK(foundData);
  }
};

const readSeekerLanguageService = async (tenantDbConnection, request) => {
  const Seeker_Language = await tenantDbConnection.model("seeker_language");

  const data = await getSpecificData(Seeker_Language, {
    _id: request.params.id,
    delete_status: false,
  });
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK(data);
};

const updateSeekerLanguageService = async (tenantDbConnection, request) => {
  const Seeker_Language = await tenantDbConnection.model("seeker_language");
  const data = await updateSpecificData(
    Seeker_Language,
    { _id: request.params.id, delete_status: false },
    { $set: request.body }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Updated successfully");
};

const deleteSeekerLanguageService = async (tenantDbConnection, request) => {
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");
  const Seeker_Language = await tenantDbConnection.model("seeker_language");


  const profile = await getSpecificData(Seeker_Profile, {
    user_account_id: request.user.id,
    delete_status: false,
  });

  const data = await updateSpecificData(
    Seeker_Language,
    { _id: request.params.id, delete_status: false },
    { delete_status: true }
  );
  if (!data) return status_codes.recordNotFound(data);

  await updateSpecificData(
    Seeker_Profile,
    { _id: profile._id },
    { $pull: { "work_and_experience.seeker_languages": request.params.id } }
  )
  return status_codes.OK("Deleted successfully");
};

// Seeker Question
const createSeekerQuestionService = async (tenantDbConnection, request) => {
  const Seeker_Question = await tenantDbConnection.model("seeker_question");
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");

  const profile = await getSpecificData(Seeker_Profile, {
    user_account_id: request.user.id,
    delete_status: false,
  });
  const skillQuestion = await createSeekerQuestion(
    Seeker_Question,
    request,
    profile._id
  );

  await updateSpecificData(
    Seeker_Profile,
    { _id: profile._id },
    { $push: { seeker_questions: skillQuestion._id } }
  );

  return status_codes.recordCreated();
};

const readAllSeekerQuestionService = async (tenantDbConnection, request) => {
  const Seeker_Question = await tenantDbConnection.model("seeker_question");

  const { page, perPage } = request.query;
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(perPage) || 50,
  };

  // const profile = await getSpecificData(seeker_profile, {
  //   user_account_id: request.user.id,
  //   delete_status: false,
  // });

  const foundData = await getAllData(Seeker_Question, {}, options);

  if (!foundData.totalDocs) {
    return status_codes.recordNotFound(foundData);
  } else {
    return status_codes.OK(foundData);
  }
};

const readSeekerQuestionService = async (tenantDbConnection, request) => {
  const Seeker_Question = await tenantDbConnection.model("seeker_question");
  const data = await getSpecificData(Seeker_Question, {
    _id: request.params.id,
    delete_status: false,
  });
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK(data);
};

const updateSeekerQuestionService = async (tenantDbConnection, request) => {
  const Seeker_Question = await tenantDbConnection.model("seeker_question");
  const data = await updateSpecificData(
    Seeker_Question,
    { _id: request.params.id, delete_status: false },
    { $set: request.body }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Updated successfully");
};

const deleteSeekerQuestionService = async (tenantDbConnection, request) => {
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");
  const Seeker_Question = await tenantDbConnection.model("seeker_question");

  const profile = await getSpecificData(Seeker_Profile, {
    user_account_id: request.user.id,
    delete_status: false,
  });

  const data = await updateSpecificData(
    Seeker_Question,
    { _id: request.params.id, delete_status: false },
    { delete_status: true }
  );
  if (!data) return status_codes.recordNotFound(data);

  await updateSpecificData(
    Seeker_Profile,
    { _id: profile._id },
    { $pull: { seeker_questions: request.params.id } }
  )

  return status_codes.OK("Deleted successfully");
};

// Skill set
const createSkillSetService = async (tenantDbConnection, request) => {
  const Skill_Set = await tenantDbConnection.model("skill_set");

  const skillSet = await createSkillSet(Skill_Set, request);
  return status_codes.recordCreated();
};

const readAllSkillSetService = async (tenantDbConnection, request) => {
  const { page, perPage } = request.query;
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(perPage) || 50,
  };
  const Skill_Set = await tenantDbConnection.model("skill_set");

  const foundData = await getAllData(Skill_Set, {}, options);

  if (!foundData.totalDocs) {
    return status_codes.recordNotFound(foundData);
  } else {
    return status_codes.OK(foundData);
  }
};

const readSkillSetService = async (tenantDbConnection, request) => {
  const Skill_Set = await tenantDbConnection.model("skill_set");

  const data = await getSpecificData(Skill_Set, {
    _id: request.params.id,
    delete_status: false,
  });
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK(data);
};

const updateSkillSetService = async (tenantDbConnection, request) => {
  const Skill_Set = await tenantDbConnection.model("skill_set");

  const data = await updateSpecificData(
    Skill_Set,
    { _id: request.params.id, delete_status: false },
    { $set: request.body }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Updated successfully");
};

const deleteSkillSetService = async (tenantDbConnection, request) => {
  const Skill_Set = await tenantDbConnection.model("skill_set");

  const data = await updateSpecificData(
    Skill_Set,
    { _id: request.params.id, delete_status: false },
    { delete_status: true }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Deleted successfully");
};

// All seeker profile details add
const createAllInOneProfileService = async (tenantDbConnection, request) => {
  // Calling models from cache
  // const Seeker_Skill_Set = await tenantDbConnection.model("seeker_skill_set");
  const Education_Details = await tenantDbConnection.model("education_details");
  const Experience_Details = await tenantDbConnection.model(
    "experience_details"
  );
  const Seeker_Language = await tenantDbConnection.model("seeker_language");
  const Seeker_Question = await tenantDbConnection.model("seeker_question");
  const Seeker_Profile = await tenantDbConnection.model("seeker_profile");
  const User_Account = await tenantDbConnection.model("user_account");
  
  let seeker_skills = request.body.work_and_experience.seeker_skills
  
  // Checking if profile already exists or not
  const profile = await getSpecificData(Seeker_Profile, {
    user_account_id: request.user.id,
  });
  if (profile) return status_codes.conflict("Profile already exists");

  // Creating an instance of seeker profile
  const data = await new Seeker_Profile({
    user_account_id: request.user.id,
    personal_info: request.body.personal_info,
    full_name: request.body.personal_info.first_name + request.body.personal_info.middle_name + request.body.personal_info.last_name
  });

  // Creating new arrays from body received to add a new profile_id parameter
  const education_details_arr =
    request.body.work_and_experience.education_details.map((arg) => ({
      ...arg,
      seeker_profile_id: data._id,
    }));

  const experience_details_arr =
    request.body.work_and_experience.experience_details.map((arg) => ({
      ...arg,
      seeker_profile_id: data._id,
    }));

  // const seeker_skill_sets_arr =
  //   request.body.work_and_experience.seeker_skill_sets.map((arg) => ({
  //     ...arg,
  //     seeker_profile_id: data._id,
  //   }));

  const seeker_languages_arr =
    request.body.work_and_experience.seeker_languages.map((arg) => ({
      ...arg,
      seeker_profile_id: data._id,
    }));

  const seeker_questions_arr = request.body.seeker_questions.map((arg) => ({
    ...arg,
    seeker_profile_id: data._id,
  }));

  // const seeker_skills_arr = request.body.work_and_experience.seeker_skills.map((arg) => ({
  //   ...arg,
  //   seeker_profile_id: data._id,
  // }));

  const job_categories = request.body.work_and_experience.job_categories;


  // Saving the referenced documents in database
  const educationDetails = await createBulk(
    Education_Details,
    education_details_arr
  );
  const education_details = educationDetails.map((arg) => arg._id);

  const experienceDetails = await createBulk(
    Experience_Details,
    experience_details_arr
  );
  const experience_details = experienceDetails.map((arg) => arg._id);

  // const seekerSkillSet = await createBulk(
  //   Seeker_Skill_Set,
  //   seeker_skill_sets_arr
  // );
  // const seeker_skill_sets = seekerSkillSet.map((arg) => arg._id);

  const seekerLanguages = await createBulk(
    Seeker_Language,
    seeker_languages_arr
  );
  const seeker_languages = seekerLanguages.map((arg) => arg._id);

  const seekerQuestions = await createBulk(
    Seeker_Question,
    seeker_questions_arr
  );
  const seeker_questions = seekerQuestions.map((arg) => arg._id);

  // const seekerSkill = await createBulk(
  //   Seeker_Skill,
  //   seeker_skills_arr
  // );
  // const seeker_skills = seekerSkill.map((arg) => arg._id);

  // Adding all the saved referenced documents in the seeker profile database
  data.work_and_experience = {
    education_details,
    experience_details,
    // seeker_skill_sets,
    seeker_languages,
    job_categories,
    seeker_skills
  };
  data.seeker_questions = seeker_questions;

  // Saving it finally
  data.save();

  // Updating the seeker profile id in user account
  await updateSpecificData(
    User_Account,
    { _id: request.user.id },
    { seeker_profile_id: data._id }
  );

  // Status return
  return status_codes.OK({
    message: "Profile created successfully",
    data: data._id,
  });
};

// Upload cv of seeker profile
const uploadCVService = async (request) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_CONNECTION_STRING
  );
  const containerName = "cvs";

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobName = getBlobName(request.file.originalname);

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const stream = getStream(request.file.buffer);
  const streamLength = request.file.buffer.length;

  const blobOptions = {
    blobHTTPHeaders: { blobContentType: request.file.mimetype },
  };
  await blockBlobClient.uploadStream(
    stream,
    streamLength,
    undefined,
    blobOptions
  );

  //   const updateUser = await updateProfile(
  //     User,
  //     { _id: request.params.id },
  //     { profileImage: blockBlobClient.url }
  //   );

  //   if (!updateUser) return status_code.OK("Profile not found");

  //   return status_code.OK("Profile image updated successfully");

  return status_codes.OK(blockBlobClient.url);
};



// // Seeker skills
// const createSeekerSkillService = async (tenantDbConnection, request) => {
//   const Seeker_Skill = await tenantDbConnection.model("seeker_skill");
//   const Seeker_Profile = await tenantDbConnection.model("seeker_profile");

//   const profile = await getSpecificData(Seeker_Profile, {
//     user_account_id: request.user.id,
//     delete_status: false,
//   });

//   const data = await createSeekerSkill(Seeker_Skill, request, profile._id);
//   return status_codes.recordCreated();
// };

// const getAllSeekerSkillsService = async (tenantDbConnection, request) => {
//   const { page, perPage } = request.query;
//   const options = {
//     page: parseInt(page) || 1,
//     limit: parseInt(perPage) || 50,
//   };
//   const Seeker_Skill = await tenantDbConnection.model("seeker_skill");

//   const foundData = await getAllData(Seeker_Skill, {delete_status: false}, options);

//   if (!foundData.totalDocs) {
//     return status_codes.recordNotFound(foundData);
//   } else {
//     return status_codes.OK(foundData);
//   }
// };

export {
  // Seeker profile
  readAllSeekerProfileService,
  createSeekerProfileService,
  readSeekerProfileService,
  updateSeekerProfileService,
  deleteSeekerProfileService,

  // Education details
  createSeekerEducationDetailsService,
  readAllSeekerEducationDetailsService,
  readSeekerEducationDetailsService,
  updateSeekerEducationDetailsService,
  deleteSeekerEducationDetailsService,

  // Experience details
  createSeekerExperienceDetailsService,
  readAllSeekerExperienceDetailsService,
  readSeekerExperienceDetailsService,
  updateSeekerExperienceDetailsService,
  deleteSeekerExperienceDetailsService,

  // Profile visit log
  createSeekerProfileVisitLogService,
  readAllSeekerProfileVisitLogService,
  readSeekerProfileVisitLogService,
  updateSeekerProfileVisitLogService,
  deleteSeekerProfileVisitLogService,

  // Seeker skll name
  createSeekerSkillSetService,
  readAllSeekerSkillSetService,
  readSeekerSkillSetService,
  updateSeekerSkillSetService,
  deleteSeekerSkillSetService,

  // Seeker skill level
  createSkillSetService,
  readAllSkillSetService,
  readSkillSetService,
  updateSkillSetService,
  deleteSkillSetService,

  // All seeker profile details add
  createAllInOneProfileService,

  // Upload cv
  uploadCVService,

  // Seeker language
  createSeekerLanguageService,
  readAllSeekerLanguageService,
  readSeekerLanguageService,
  updateSeekerLanguageService,
  deleteSeekerLanguageService,

  // Seeker Question
  createSeekerQuestionService,
  readAllSeekerQuestionService,
  readSeekerQuestionService,
  updateSeekerQuestionService,
  deleteSeekerQuestionService,

  // createSeekerSkillService,
  // getAllSeekerSkillsService
};
