const getAllData = async (modelName, filter, options) => {
  const model = await modelName.paginate(filter, options);
  return model;
};

const createSeekerProfileData = (model, request) => {
  const profile = new model(request.body);
  profile.user_account_id = request.user.id;
  profile.save();
};

const getSpecificData = async (modelName, filter, populate_field) => {
  const model = await modelName.findOne(filter).populate(populate_field);
  return model;
};

const getSpecificDataAllDetails = async (
  modelName,
  filter,
  populateArr,
  selectedFields
) => {
  const [field1, field2, field3, field4, field5, field6, field7] = populateArr;
  const model = await modelName
    .findOne(filter)
    .populate(field1)
    .populate(field2)
    .populate(field3)
    .populate(field4)
    .populate(field5)
    .populate(field6)
    .populate(field7)
    .select(selectedFields);

  return model;
};

const updateSpecificData = async (modelName, filter, update) => {
  const model = await modelName.findOneAndUpdate(filter, update);
  return model;
};

const createSeekerProfileEducationDetails = (modelName, request, profileId) => {
  const data = new modelName(request.body);
  data.starting_date = new Date(request.body.starting_date);
  data.completion_date = new Date(request.body.completion_date);
  data.seeker_profile_id = profileId;
  data.save();
  return data;
};

const createSeekerProfileExperienceDetails = (
  modelName,
  request,
  profileId
) => {
  const data = new modelName(request.body);
  data.start_date = new Date(request.body.start_date);
  data.end_date = new Date(request.body.end_date);
  data.seeker_profile_id = profileId;
  data.save();
  return data;
};

const createSeekerProfileVisitLog = (modelName, request, profileId) => {
  const data = new modelName(request.body);
  data.seeker_profile_id = profileId;
  data.visit_date = new Date();
  data.user_account_id = request.user.id;
  data.save();
  return data;
};

const createSeekerSkillSet = (modelName, request, profileId) => {
  const data = new modelName(request.body);
  data.seeker_profile_id = profileId;
  data.save();
  return data;
};

const createSeekerLanguage = (modelName, request, profileId) => {
  const data = new modelName(request.body);
  data.seeker_profile_id = profileId;
  data.save();
  return data;
};

const createSkillSet = (modelName, request) => {
  const data = new modelName(request.body);
  data.save();
  return data;
};

const createBulk = async (modelName, data, id) => {
  const model = await modelName.insertMany(data);
  return model;
};

const createSeekerQuestion = (modelName, request, profileId) => {
  const data = new modelName(request.body);
  data.seeker_profile_id = profileId;
  data.save();
  return data;
};
// const createCompanyDetails = (model1, model2, request) => {
//     const company = new model1(request.body);
//     company.delete_status = false;

//     const company_image = new model2({
//         company_image: request.body.company_image
//     })

//     company_image.save()

//     company.company_image_ref_id = company_image._id;
//     company.save();
//     return company
// }

// const getSpecificData = async (modelName, filter, populate_field) => {
//     const model = await modelName.findOne(filter).populate(populate_field);
//     return model
// }

// const deleteCompanyData = async (modelName, filter, update) => {
//     const model = await modelName.updateOne(filter, update);
//     return model
// }
export {
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
  createSeekerQuestion
};
