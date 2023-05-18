import * as status_codes from "../util/status_codes.util.js";
import job_post from "../model/job_post.model.js";
// import job_location from "../model/job_location.model.js";
import job_post_skill_set from "../model/job_post_skill_set.model.js";
import job_post_action from "../model/job_post_action.model.js";
import job_application_status from "../model/job_application_status.model.js";
import job_post_activity_log from "../model/job_post_activity_log.model.js";
import {
  createJobLocationData,
  //   getAllJobLocationData,
  createJobCategoryData,
  //   getAllJobTypeData,
  createJobPostData,
  //   getAllJobPostData,
  getSpecificJobPostData,
  updateSpecificJobPostData,
  getAllJobData,
  createJobPostSkillSetData,
  getSpecificData,
  updateSpecificData,
  getSpecificJobPostSkillSetData,
  createJobData,
  createJobPostActivityData,
  createJobPostActivityLogData,
  createjobInterviewLevelData,
  getSpecificJobPostActitvityData,
  createjobInvitationData,
} from "../util/db_calls/job.calls.js";

import * as filter from "../helper/filter/job.filter.js";

import * as userCalls from "../util/db_calls/user.calls.js";
import * as companyCalls from "../util/db_calls/company.calls.js";
import sendInvitationEmail from "../util/email_service/send_invite.email.js";

// Job locations
const getJobLocationService = async (tenantDbConnection, request) => {
  try {
    const job_location = tenantDbConnection.model("job_location");
    const { page, perPage } = request.query;
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(perPage) || 50,
    };
    const data = await getAllJobData(job_location, {}, options);
    return status_codes.OK(data);
  } catch (error) {
    return error;
  }
};

const createJobLocationService = (tenantDbConnection, request) => {
  try {
    const job_location = tenantDbConnection.model("job_location");
    createJobLocationData(job_location, request);
    return status_codes.recordCreated();
  } catch (error) {
    return error.message;
  }
};

const getSpecificJobLocationService = async (tenantDbConnection, request) => {
  try {
    const job_location = tenantDbConnection.model("job_location");
    const data = await getSpecificData(job_location, {
      _id: request.params.id,
    });
    if (!data) return status_codes.recordNotFound(data);

    return status_codes.OK(data);
    return data;
  } catch (error) {
    return error;
  }
};

const updateSpecificJobLocationService = async (
  tenantDbConnection,
  request
) => {
  try {
    const job_location = tenantDbConnection.model("job_location");
    const data = await updateSpecificData(
      job_location,
      { _id: request.params.id, delete_status: false },
      { $set: request.body }
    );
    if (!data) return status_codes.recordNotFound(data);

    return status_codes.OK("Updated successfully");
  } catch (error) {
    return error;
  }
};

const deleteSpecificJobLocationService = async (
  tenantDbConnection,
  request
) => {
  try {
    const job_location = tenantDbConnection.model("job_location");
    const data = await updateSpecificData(
      job_location,
      { _id: request.params.id, delete_status: false },
      { delete_status: true }
    );
    if (!data) return status_codes.recordNotFound(data);

    return status_codes.OK("Deleted successfully");
  } catch (error) {
    return error;
  }
};

// Job category

const createJobCategoryService = (tenantDbConnection, request) => {
  try {
    const job_category = tenantDbConnection.model("job_category");
    createJobCategoryData(job_category, request);
    return status_codes.recordCreated();
  } catch (error) {
    return error.message;
  }
};

const getJobCategoryService = async (tenantDbConnection, request) => {
  try {
    const job_category = tenantDbConnection.model("job_category");
    const { page, perPage } = request.query;
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(perPage) || 10,
    };
    const data = await getAllJobData(
      job_category,
      { delete_status: false },
      options
    );
    return status_codes.OK(data);
  } catch (error) {
    return error;
  }
};

const getSpecificJobCategoryService = async (tenantDbConnection, request) => {
  try {
    const job_category = tenantDbConnection.model("job_category");
    const data = await getSpecificData(job_category, {
      _id: request.params.id,
      delete_status: false,
    });
    if (!data) return status_codes.recordNotFound(data);

    return status_codes.OK(data);
  } catch (error) {
    return error;
  }
};

const updateSpecificJobCategoryService = async (
  tenantDbConnection,
  request
) => {
  try {
    const job_category = tenantDbConnection.model("job_category");
    const data = await updateSpecificData(
      job_category,
      { _id: request.params.id, delete_status: false },
      { $set: request.body }
    );
    if (!data) return status_codes.recordNotFound(data);

    return status_codes.OK("Updated successfully");
  } catch (error) {
    return error;
  }
};

const deleteSpecificJobCategoryService = async (
  tenantDbConnection,
  request
) => {
  try {
    const job_category = tenantDbConnection.model("job_category");
    const data = await updateSpecificData(
      job_category,
      { _id: request.params.id, delete_status: false },
      { delete_status: true }
    );
    if (!data) return status_codes.recordNotFound(data);

    return status_codes.OK("Deleted successfully");
  } catch (error) {
    return error;
  }
};

// Job post
const getJobPostService = async (tenantDbConnection, request) => {
  try {
    const job_post = tenantDbConnection.model("job_post");
    const { page, perPage } = request.query;
    // const options = {
    //   page: parseInt(page) || 1,
    //   limit: parseInt(perPage) || 50,
    //   populate: [
    //     {
    //       path: "company_id",
    //       select: "company_name company_website_url ",
    //     },
    //     {
    //       path: "skills.skill_set_id",
    //       select: "skill_set_name"
    //     },
    //     {
    //       path: "locations.job_location_id",
    //       select: "street_address city state country zip"
    //     },
    //     {
    //       path: "job_category_id",
    //       select: "name"
    //     },
    //   ],
    //   select: "-delete_status -createdAt -updatedAt -__v"
    // };

    // const data = await getAllJobData(job_post, filter.getAllJobs(request), options);
    // return status_codes.OK(data);

    // For categorized based jobs

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(perPage) || 10,
    };
    const data = await job_post.aggregatePaginate(
      job_post.aggregate([
        {
          $lookup: {
            from: "job_categories",
            localField: "job_category_id",
            foreignField: "_id",
            as: "job_category_id",
          },
        },
        {
          $unwind: "$job_category_id"
        },
        {
          $match:
            "job_category" in request.query
              ? {
                  "job_category_id.name": {
                    $in: filter.getAllCategorizedJobs(request).job_category,
                  },
                }
              : {},
        },
        {
          $match: filter.getAllJobs(request),
        },

        {
          $lookup: {
            from: "job_locations",
            localField: "locations.job_location_id",
            foreignField: "_id",
            as: "locations",
          },
        },
        {
          $project: {
            _id: 1,
            created_date: 1,
            "job_category_id.name": 1,
            job_title: 1,
            job_status: 1,
            job_shift: 1,
            job_type: 1,
            "locations.street_address": 1,
            "locations.city": 1,
            "locations.state": 1,
            "locations.country": 1,
            "locations.zip": 1,
            job_location_type: 1,
            experience: 1,
          },
        },
      ]),
      options
    );

    return status_codes.OK(data);
  } catch (error) {
    return error;
  }
};

const createJobPostService = async (tenantDbConnection, request) => {
  try {
    const job_post = tenantDbConnection.model("job_post");
    const company = tenantDbConnection.model("company");
    const user_account = tenantDbConnection.model("user_account");

    const user_data = await userCalls.getUserData(user_account, {
      _id: request.user.id,
    });
    const company_data = await companyCalls.getSpecificData(company, {
      company_name: user_data.company_name,
    });

    const data = createJobPostData(job_post, request, company_data);
    return status_codes.recordCreated();
  } catch (error) {
    return error.message;
  }
};

const getSpecificJobPostService = async (tenantDbConnection, request) => {
  const job_post = tenantDbConnection.model("job_post");

  const data = await getSpecificJobPostData(
    job_post,
    { _id: request.params.id, delete_status: false },
    {
      path: "company_id",
      select: "company_name company_website_url ",
    },
    {
      path: "skills.skill_set_id",
      select: "skill_set_name",
    },
    {
      path: "locations.job_location_id",
      select: "street_address city state country zip",
    },
    {
      delete_status: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    }
  );
  if (!data) {
    return status_codes.recordNotFound(data);
  }
  return status_codes.OK(data);
};

const updateSpecificJobPostService = async (tenantDbConnection, request) => {
  const job_post = tenantDbConnection.model("job_post");
  const data = await updateSpecificJobPostData(
    job_post,
    { _id: request.params.id, delete_status: false },
    { $set: request.body }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Updated successfully");
};

const deleteSpecificJobPostService = async (tenantDbConnection, request) => {
  const job_post = tenantDbConnection.model("job_post");
  const data = await updateSpecificJobPostData(
    job_post,
    { _id: request.params.id, delete_status: false },
    { delete_status: true }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Deleted successfully");
};

// Job post activity
const getJobPostActivityService = async (tenantDbConnection, request) => {
  const job_post_activity = tenantDbConnection.model("job_post_activity");
  const { page, perPage } = request.query;
  // const options = {
  //   page: parseInt(page) || 1,
  //   limit: parseInt(perPage) || 10,
  //   populate: [
  //     {
  //       path: 'job_post_id',
  //       select: 'job_title job_description job_status job_shift job_type job_location_type locations experience',
  //       populate: {
  //         path: "locations.job_location_id",
  //         select: "-_id -__v -createdAt -updatedAt -delete_status",
  //       }
  //     },
  //     {
  //       path: 'seeker_profile_id',
  //       populate: [
  //         {
  //           path: "user_account_id",
  //           select: "-_id full_name email date_of_birth gender contact_number",
  //         },
  //         {
  //           path: "work_and_experience.education_details",
  //           select:
  //             "-_id certificate_degree_name institute_university_name starting_date completion_date percentage cgpa field_of_study",
  //         },
  //         {
  //           path: "work_and_experience.experience_details",
  //           select:
  //             "-_id is_current_job start_date end_date job_title description company_name job_location_city job_location_state job_location_country",
  //         },
  //         {
  //           path: "work_and_experience.profile_visit_logs",
  //           select: "-_id visit_date is_resume_downloaded is_job_notification_sent",
  //         },
  //         {
  //           path: "work_and_experience.seeker_languages",
  //           select: "-_id fluent language reading_proficiency speaking_proficiency",
  //         },
  //         {
  //           path: "work_and_experience.seeker_skill_sets",
  //           select: "skill_level -_id",
  //           populate: {
  //             path: "skill_set_id",
  //             select: "-_id skill_set_name",
  //           },
  //         },
  //         {
  //           path: "seeker_questions",
  //           select: "-_id ques ans"
  //         }
  //       ]
  //     },
  //   ]
  // }

  // const data = await getAllJobData(job_post_activity, filter.getAllAppliedJobs(request), options);
  // // const data = await getAllJobData(job_post_activity, {}, options);
  // if(!data.totalDocs) return status_codes.recordNotFound(data)

  // // data.docs = data.docs.filter(arg => arg.job_post_id !== null);
  // return status_codes.OK(data)

  // Aggregated work

  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(perPage) || 10,
  };
  const data = await job_post_activity.aggregatePaginate(
    job_post_activity.aggregate([
      { $match: filter.getAllAppliedJobs(request) },
      {
        $lookup: {
          from: "job_posts",
          localField: "job_post_id",
          foreignField: "_id",
          as: "job_post_id",
        },
      },
      {
        $unwind: "$job_post_id"
      },
      {
        $lookup: {
          from: "job_locations",
          localField: "job_post_id.locations.job_location_id",
          foreignField: "_id",
          as: "job_post_id.locations",
        },
      },
      {
        $lookup: {
          from: "seeker_profiles",
          localField: "seeker_profile_id",
          foreignField: "_id",
          as: "seeker_profile_id",
        },
      },
      {
        $unwind: "$seeker_profile_id"
      },
      {
        $match: filter.getFilteredAppliedJobs(request)
      },
      {
        $project: {
          _id: 1,
          "job_post_id.job_title": 1,
          apply_date: 1,
          "job_post_id.job_type": 1,
          job_application_status: 1,
          "job_post_id.locations.street_address": 1,
          "job_post_id.locations.city": 1,
          "job_post_id.locations.state": 1,
          "job_post_id.locations.country": 1,
          "job_post_id.locations.zip": 1,
          "seeker_profile_id.personal_info.first_name": 1,
          "seeker_profile_id.personal_info.middle_name": 1,
          "seeker_profile_id.personal_info.last_name": 1
        },
      },
    ]),
    options
  );
  if(!data.totalDocs) return status_codes.recordNotFound(data)
  return status_codes.OK(data);
};

const createJobPostActivityService = async (tenantDbConnection, request) => {
  const job_post_activity = await tenantDbConnection.model("job_post_activity");
  const user_account = await tenantDbConnection.model("user_account");
  const user_data = await userCalls.getUserData(user_account, {
    _id: request.user.id,
  });
  if ("seeker_profile_id" in user_data) {
    const data = await getSpecificJobPostActitvityData(job_post_activity, {
      job_post_id: request.body.job_post_id,
      seeker_profile_id: user_data.seeker_profile_id,
    });
    if (data) return status_codes.OK("You've already applied to this job.");

    createJobPostActivityData(
      job_post_activity,
      request,
      user_data.seeker_profile_id
    );
    return status_codes.recordCreated();
  } else {
    return status_codes.unauthorized("Profile not created yet");
  }
};

const getSpecificJobPostActivityService = async (
  tenantDbConnection,
  request
) => {
  const job_post_activity = tenantDbConnection.model("job_post_activity");
  // const data = await getSpecificJobPostData(
  //   job_post_activity,
  //   { _id: request.params.id, delete_status: false },
  //   { path: "user_account_id", select: 'full_name email gender contact_number' },
  //   { path: "job_post_id", select: 'job_title job_description' },
  //   { path: "job_application_status_id", select: 'status_desc' }
  //   );

  const data = await getSpecificJobPostActitvityData(
    job_post_activity,
    { _id: request.params.id, delete_status: false },
    [
      // {
      //   path: 'user_account_id',
      //   select: 'full_name email gender contact_number'
      // },
      // {
      //   path: 'job_application_status_id',
      //   select: 'status_desc'
      // },
      {
        path: "job_post_id",
        select:
          "job_title job_description job_status job_shift job_type job_location_type locations experience",
        populate: {
          path: "locations.job_location_id",
          select: "-_id -__v -createdAt -updatedAt -delete_status",
        },
      },
      {
        path: "seeker_profile_id",
        populate: [
          {
            path: "user_account_id",
            select: "-_id full_name email date_of_birth gender contact_number",
          },
          {
            path: "work_and_experience.education_details",
            select:
              "-_id certificate_degree_name institute_university_name starting_date completion_date percentage cgpa field_of_study",
          },
          {
            path: "work_and_experience.experience_details",
            select:
              "-_id is_current_job start_date end_date job_title description company_name job_location_city job_location_state job_location_country",
          },
          {
            path: "work_and_experience.profile_visit_logs",
            select:
              "-_id visit_date is_resume_downloaded is_job_notification_sent",
          },
          {
            path: "work_and_experience.seeker_languages",
            select:
              "-_id fluent language reading_proficiency speaking_proficiency",
          },
          {
            path: "work_and_experience.seeker_skill_sets",
            select: "skill_level -_id",
            populate: {
              path: "skill_set_id",
              select: "-_id skill_set_name",
            },
          },
          {
            path: "seeker_questions",
            select: "-_id ques ans",
          },
        ],
      },
    ]
  );
  if (!data) {
    return status_codes.recordNotFound(data);
  }
  return status_codes.OK(data);
};

const updateSpecificJobPostActivityService = async (
  tenantDbConnection,
  request
) => {
  const job_post_activity = tenantDbConnection.model("job_post_activity");
  const data = await updateSpecificData(
    job_post_activity,
    { _id: request.params.id, delete_status: false },
    { $set: request.body }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Updated successfully");
};

const deleteSpecificJobPostActivityService = async (
  tenantDbConnection,
  request
) => {
  const job_post_activity = tenantDbConnection.model("job_post_activity");
  const data = await updateSpecificData(
    job_post_activity,
    { _id: request.params.id, delete_status: false },
    { delete_status: true }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Deleted successfully");
};

// Job interview levels
const getJobInterviewLevelService = async (tenantDbConnection, request) => {
  const job_interview_level = tenantDbConnection.model("job_interview_level");
  const { page, perPage } = request.query;
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(perPage) || 50,
  };

  const data = await getAllJobData(job_interview_level, {}, options);
  if (!data.totalDocs) return status_codes.recordNotFound(data);

  return status_codes.OK(data);
};

const createJobInterviewLevelService = async (tenantDbConnection, request) => {
  const job_interview_level = await tenantDbConnection.model(
    "job_interview_level"
  );
  const data = await createjobInterviewLevelData(job_interview_level, request);
  return status_codes.recordCreated("Interview added");
};

const getSpecificJobInterviewLevelService = async (
  tenantDbConnection,
  request
) => {
  const job_interview_level = tenantDbConnection.model("job_interview_level");
  const data = await getSpecificData(job_interview_level, {
    _id: request.params.id,
    delete_status: false,
  });
  if (!data) {
    return status_codes.recordNotFound(data);
  }
  return status_codes.OK(data);
};

const updateSpecificJobInterviewLevelService = async (
  tenantDbConnection,
  request
) => {
  const job_interview_level = tenantDbConnection.model("job_interview_level");
  const data = await updateSpecificData(
    job_interview_level,
    { _id: request.params.id, delete_status: false },
    { $set: request.body }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Updated successfully");
};

const deleteSpecificJobInterviewLevelService = async (
  tenantDbConnection,
  request
) => {
  const job_interview_level = tenantDbConnection.model("job_interview_level");
  const data = await updateSpecificData(
    job_interview_level,
    { _id: request.params.id, delete_status: false },
    { delete_status: true }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Deleted successfully");
};

// Job invitation
const getJobInvitationService = async (tenantDbConnection, request) => {
  const job_invitation = tenantDbConnection.model("job_invitation");
  const { page, perPage } = request.query;
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(perPage) || 50,
  };

  const data = await getAllJobData(job_invitation, {}, options);
  if (!data.totalDocs) return status_codes.recordNotFound(data);

  return status_codes.OK(data);
};

const createJobInvitationService = async (tenantDbConnection, request) => {
  const job_invitation = await tenantDbConnection.model("job_invitation");
  const job_post_activity = tenantDbConnection.model("job_post_activity");

  const email_data = {
    email: request.body.email,
    message: request.body.message,
  };
  if (!("email" in request.body)) return status_codes.OK("Email doesnot exist");

  await createjobInvitationData(job_invitation, request);

  await updateSpecificData(
    job_post_activity,
    { _id: request.body.job_post_activity_id, delete_status: false },
    { job_application_status: "invited" }
  );

  await sendInvitationEmail(email_data);

  return status_codes.OK("Invitation sent to mail");
};

const getSpecificJobInvitationService = async (tenantDbConnection, request) => {
  const job_invitation = tenantDbConnection.model("job_invitation");
  const data = await getSpecificData(job_invitation, {
    _id: request.params.id,
    delete_status: false,
  });
  if (!data) {
    return status_codes.recordNotFound(data);
  }
  return status_codes.OK(data);
};

const updateSpecificJobInvitationService = async (
  tenantDbConnection,
  request
) => {
  const job_invitation = tenantDbConnection.model("job_invitation");
  const data = await updateSpecificData(
    job_invitation,
    { _id: request.params.id, delete_status: false },
    { $set: request.body }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Updated successfully");
};

const deleteSpecificJobInvitationService = async (
  tenantDbConnection,
  request
) => {
  const job_invitation = tenantDbConnection.model("job_invitation");
  const data = await updateSpecificData(
    job_invitation,
    { _id: request.params.id, delete_status: false },
    { delete_status: true }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Deleted successfully");
};

// Not used APIs

// Applied Jobs
const getAppliedJobsService = async (tenantDbConnection, request) => {
  const job_post_activity = tenantDbConnection.model("job_post_activity");
  // const data = await job_post_activity.aggregate([
  //   {
  //     $lookup: {
  //       from: "user_account",
  //       localField: "_id",
  //       foreignField: "user_account_id",
  //       as: "user_account_details",
  //     }
  //   }
  // ])
  // return data

  const data = await job_post_activity.aggregate([
    // {
    //   $match: {
    //     $and: [
    //       {
    //         orderStatus: {
    //           $ne: "cancelled",
    //         },
    //       },
    //       {
    //         orderPlaced: {
    //           $gte: lastMonthStart,
    //           $lt: lastMonthEnd,
    //         },
    //       },
    //     ],
    //   },
    // },
    // { $unwind: "$products" },

    // {
    //   $group: {
    //     _id: "$products.prodRefId",
    //     count: { $sum: "$products.quantity" },
    //   },
    // },
    // {
    //   $sort: { count: -1 },
    // },
    // {
    //   $limit: 3,
    // },
    {
      $lookup: {
        from: "user_accounts",
        localField: "user_account_id",
        foreignField: "_id",
        as: "user_details",
      },
    },
    {
      $lookup: {
        from: "job_posts",
        localField: "job_post_id",
        foreignField: "_id",
        as: "job_details",
      },
    },
    // {
    //   $project: {
    //     productName: { $arrayElemAt: ["$product_details.name", 0] },
    //     count: 1,
    //     _id: 1
    //   },
    // },
  ]);
  return data;
};

// Job post skill set
const getJobPostSkillSetService = async (request) => {
  try {
    const { page, perPage } = request.query;
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(perPage) || 50,
      populate: "job_post_id",
    };
    const data = await getAllJobData(job_post_skill_set, {}, options);
    return status_codes.OK(data);
  } catch (error) {
    return error;
  }
};

const createJobPostSkillSetService = async (request) => {
  try {
    const data = await getSpecificData(job_post_skill_set, {
      job_post_id: request.body.job_post_id,
    });
    if (data) return status_codes.OK("Skill already set for this job");

    createJobPostSkillSetData(job_post_skill_set, request);
    return status_codes.recordCreated();
  } catch (error) {
    return error.message;
  }
};

const getSpecificJobPostSkillSetService = async (request) => {
  const data = await getSpecificJobPostSkillSetData(
    job_post_skill_set,
    { _id: request.params.id, delete_status: false },
    { path: "job_post_id" }
  );
  if (!data) {
    return status_codes.recordNotFound(data);
  }
  return status_codes.OK(data);
};

const updateSpecificJobPostSkillSetService = async (request) => {
  const data = await updateSpecificData(
    job_post_skill_set,
    { _id: request.params.id, delete_status: false },
    { $set: request.body }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Updated successfully");
};

const deleteSpecificJobPostSkillSetService = async (request) => {
  const data = await updateSpecificData(
    job_post_skill_set,
    { _id: request.params.id, delete_status: false },
    { delete_status: true }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Deleted successfully");
};

// Job action
const getJobPostActionService = async (request) => {
  try {
    const { page, perPage } = request.query;
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(perPage) || 50,
    };
    const data = await getAllJobData(job_post_action, {}, options);
    return status_codes.OK(data);
  } catch (error) {
    return error;
  }
};

const createJobPostActionService = async (request) => {
  try {
    createJobData(job_post_action, request);
    return status_codes.recordCreated();
  } catch (error) {
    return error.message;
  }
};

const getSpecificJobPostActionService = async (request) => {
  const data = await getSpecificData(job_post_action, {
    _id: request.params.id,
    delete_status: false,
  });
  if (!data) {
    return status_codes.recordNotFound(data);
  }
  return status_codes.OK(data);
};

const updateSpecificJobPostActionService = async (request) => {
  const data = await updateSpecificData(
    job_post_action,
    { _id: request.params.id, delete_status: false },
    { $set: request.body }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Updated successfully");
};

const deleteSpecificJobPostActionService = async (request) => {
  const data = await updateSpecificData(
    job_post_action,
    { _id: request.params.id, delete_status: false },
    { delete_status: true }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Deleted successfully");
};

// Job application status
const getJobApplicationStatusService = async (request) => {
  const { page, perPage } = request.query;
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(perPage) || 50,
  };
  const data = await getAllJobData(job_application_status, {}, options);
  if (!data.totalDocs) return status_codes.recordNotFound(data);

  return status_codes.OK(data);
};

const createJobApplicationStatusService = (request) => {
  createJobData(job_application_status, request);
  return status_codes.recordCreated();
};

const getSpecificJobApplicationStatusService = async (request) => {
  const data = await getSpecificData(job_application_status, {
    _id: request.params.id,
    delete_status: false,
  });
  if (!data) {
    return status_codes.recordNotFound(data);
  }
  return status_codes.OK(data);
};

const updateSpecificJobApplicationStatusService = async (request) => {
  const data = await updateSpecificData(
    job_application_status,
    { _id: request.params.id, delete_status: false },
    { $set: request.body }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Updated successfully");
};

const deleteSpecificJobApplicationStatusService = async (request) => {
  const data = await updateSpecificData(
    job_application_status,
    { _id: request.params.id, delete_status: false },
    { delete_status: true }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Deleted successfully");
};

// Job post activity log
const getJobPostActivityLogService = async (request) => {
  const { page, perPage } = request.query;
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(perPage) || 50,
    populate: [
      {
        path: "user_account_id",
        select: "full_name email gender contact_number",
      },
      {
        path: "job_post_activity_id",
        select: "job_post_id job_application_status_id apply_date",
      },
      {
        path: "job_post_action_id",
        select: "action_name",
      },
    ],
  };
  const data = await getAllJobData(job_post_activity_log, {}, options);
  if (!data.totalDocs) return status_codes.recordNotFound(data);

  return status_codes.OK(data);
};

const createJobPostActivityLogService = (request) => {
  createJobPostActivityLogData(job_post_activity_log, request);
  return status_codes.recordCreated();
};

const getSpecificJobPostActivityLogService = async (request) => {
  const data = await getSpecificJobPostData(
    job_post_activity_log,
    { _id: request.params.id, delete_status: false },
    {
      path: "user_account_id",
      select: "full_name email gender contact_number",
    },
    {
      path: "job_post_activity_id",
      select: "job_post_id job_application_status_id apply_date",
    },
    { path: "job_post_action_id", select: "action_name" }
  );
  if (!data) {
    return status_codes.recordNotFound(data);
  }
  return status_codes.OK(data);
};

const updateSpecificJobPostActivityLogService = async (request) => {
  const data = await updateSpecificData(
    job_post_activity_log,
    { _id: request.params.id, delete_status: false },
    { $set: request.body }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Updated successfully");
};

const deleteSpecificJobPostActivityLogService = async (request) => {
  const data = await updateSpecificData(
    job_post_activity_log,
    { _id: request.params.id, delete_status: false },
    { delete_status: true }
  );
  if (!data) return status_codes.recordNotFound(data);

  return status_codes.OK("Deleted successfully");
};

export {
  createJobLocationService,
  getJobLocationService,
  getSpecificJobLocationService,
  updateSpecificJobLocationService,
  deleteSpecificJobLocationService,
  createJobCategoryService,
  getJobCategoryService,
  getSpecificJobCategoryService,
  updateSpecificJobCategoryService,
  deleteSpecificJobCategoryService,
  getJobPostService,
  createJobPostService,
  getSpecificJobPostService,
  updateSpecificJobPostService,
  deleteSpecificJobPostService,
  getJobPostSkillSetService,
  createJobPostSkillSetService,
  getSpecificJobPostSkillSetService,
  updateSpecificJobPostSkillSetService,
  deleteSpecificJobPostSkillSetService,
  getJobPostActionService,
  createJobPostActionService,
  getSpecificJobPostActionService,
  updateSpecificJobPostActionService,
  deleteSpecificJobPostActionService,
  getJobApplicationStatusService,
  createJobApplicationStatusService,
  getSpecificJobApplicationStatusService,
  updateSpecificJobApplicationStatusService,
  deleteSpecificJobApplicationStatusService,
  getJobPostActivityService,
  createJobPostActivityService,
  getSpecificJobPostActivityService,
  updateSpecificJobPostActivityService,
  deleteSpecificJobPostActivityService,
  getJobPostActivityLogService,
  createJobPostActivityLogService,
  getSpecificJobPostActivityLogService,
  updateSpecificJobPostActivityLogService,
  deleteSpecificJobPostActivityLogService,
  getAppliedJobsService,
  getJobInterviewLevelService,
  createJobInterviewLevelService,
  getSpecificJobInterviewLevelService,
  updateSpecificJobInterviewLevelService,
  deleteSpecificJobInterviewLevelService,
  getJobInvitationService,
  createJobInvitationService,
  getSpecificJobInvitationService,
  updateSpecificJobInvitationService,
  deleteSpecificJobInvitationService,
};
