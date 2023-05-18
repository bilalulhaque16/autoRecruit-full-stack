// const getAllJobLocationData = async (modelName, filter, options) => {
//   const model = await modelName.paginate(filter, options);
//   return model;
// };

const getAllJobData = async (modelName, filter, options) => {
  const model = await modelName.paginate(filter, options);
  return model;
};

const createJobLocationData = (modelName, request) => {
  const job_location = new modelName(request.body);
  job_location.delete_status = false;
  job_location.save();
};

// const getAllJobTypeData = async (modelName, filter, options) => {
//   const model = await modelName.paginate(filter, options);
//   return model;
// };

const createJobCategoryData = (modelName, request) => {
  const job_category = new modelName(request.body);
  job_category.save();
};

// const getAllJobPostData = async (modelName, filter, options) => {
//   const model = await modelName.paginate(filter, options);
//   return model;
// };

const createJobPostData = (modelName, request, data) => {
  const job_post = new modelName(request.body);
  job_post.posted_by_id = request.user.id;
  job_post.company_id = data._id;

  job_post.save();
};

const getSpecificJobPostData = async (
  modelName,
  filter,
  populatePath1,
  populatePath2,
  populatePath3,
  selectFields
) => {
  const foundData = await modelName
    .findOne(filter)
    .populate(populatePath1)
    .populate(populatePath2)
    .populate(populatePath3)
    .select(selectFields)
    ;
  return foundData;
};


const getSpecificJobPostActitvityData = async (
  modelName,
  filter,
  populate
) => {
  const foundData = await modelName
    .findOne(filter)
    .populate(populate)
    ;
  return foundData;
};

const updateSpecificJobPostData = async (modelName, filter, update) => {
  const updateData = await modelName.findOneAndUpdate(filter, update);
  return updateData;
};

const getSpecificData = async (modelName, filter) => {
  const foundData = await modelName.findOne(filter);
  return foundData;
};

const updateSpecificData = async (modelName, filter, update) => {
  const updateData = await modelName.findOneAndUpdate(filter, update);
  return updateData;
};

const createJobPostSkillSetData = (modelName, request) => {
  const job = new modelName(request.body);
  job.delete_status = false;
  job.save();
};

const getSpecificJobPostSkillSetData = async (
  modelName,
  filter,
  populatePath1
) => {
  const foundData = await modelName.findOne(filter).populate(populatePath1);
  return foundData;
};

const createJobData = (modelName, request) => {
  const job = new modelName(request.body);
  job.delete_status = false;
  job.save();
};

const createJobPostActivityData = (modelName, request, seeker_profile_id) => {
  const job = new modelName(request.body);
  job.user_account_id = request.user.id;
  job.seeker_profile_id = seeker_profile_id
  job.apply_date = new Date();

  job.save();
};

const createJobPostActivityLogData = (modelName, request) => {
  const job = new modelName(request.body);
  job.delete_status = false;
  job.action_date = new Date();
  job.save();
};


const createjobInterviewLevelData = (modelName, request) => {
  const job = new modelName(request.body);
  job.save();
}


const createjobInvitationData = (modelName, request) => {
  const job = new modelName(request.body);
  job.save();
}

export {
  createJobLocationData,
  //   getAllJobLocationData,
  createJobCategoryData,
  //   getAllJobTypeData,
  //   getAllJobPostData,
  createJobPostData,
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
  createjobInvitationData
};
