import {
  createJobLocationService,
  getJobLocationService,
  getSpecificJobLocationService,
  updateSpecificJobLocationService,
  deleteSpecificJobLocationService,
  createJobCategoryService,
  getJobCategoryService,
  createJobPostService,
  getJobPostService,
  getSpecificJobPostService,
  updateSpecificJobPostService,
  deleteSpecificJobPostService,
  getJobPostSkillSetService,
  createJobPostSkillSetService,
  getSpecificJobCategoryService,
  updateSpecificJobCategoryService,
  deleteSpecificJobCategoryService,
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
  deleteSpecificJobInvitationService
} from "../service/job.service.js";

import { getConnection } from "../db/connectionManager.config.js";

// Job location
const createJobLocationController = (req, res) => {
  const dbConnection = getConnection();
  const job_location = createJobLocationService(dbConnection, req);
  res.status(job_location.status).json(job_location);
};

const getJobLocationController = async (req, res) => {
  const dbConnection = getConnection();
  const job_location = await getJobLocationService(dbConnection, req);
  res.status(job_location.status).json(job_location.data);
};

const getSpecificJobLocationController = async (req, res) => {
  try {
  const dbConnection = getConnection();
    const job_location = await getSpecificJobLocationService(dbConnection, req);
    res.status(job_location.status).json(job_location);
  } catch (error) {
    res.json(error);
  }
};

const updateSpecificJobLocationController = async (req, res) => {
  try {
  const dbConnection = getConnection();
    const job_location = await updateSpecificJobLocationService(dbConnection, req);
    res.status(job_location.status).json(job_location);
  } catch (error) {
    res.json(error);
  }
};

const deleteSpecificJobLocationController = async (req, res) => {
  try {
  const dbConnection = getConnection();
    const job_location = await deleteSpecificJobLocationService(dbConnection, req);
    res.status(job_location.status).json(job_location);
  } catch (error) {
    res.json(error);
  }
};

// Job category
const createJobCategoryController = (req, res) => {
  const dbConnection = getConnection();
  const job_category = createJobCategoryService(dbConnection, req);
  res.status(job_category.status).json(job_category);
};

const getJobCategoryController = async (req, res) => {
  const dbConnection = getConnection();
  const job_category = await getJobCategoryService(dbConnection, req);
  res.status(job_category.status).json(job_category);
};

const getSpecificJobCategoryController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const job_category = await getSpecificJobCategoryService(dbConnection, req);
    res.status(job_category.status).json(job_category.data);
  } catch (error) {
    res.json(error);
  }
};

const updateSpecificJobCategoryController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const job_category = await updateSpecificJobCategoryService(dbConnection, req);
    res.status(job_category.status).json(job_category);
  } catch (error) {
    res.json(error);
  }
};

const deleteSpecificJobCategoryController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const job_category = await deleteSpecificJobCategoryService(dbConnection, req);
    res.status(job_category.status).json(job_category);
  } catch (error) {
    res.json(error);
  }
};

// Job posts
const createJobPostController = async (req, res) => {
    const dbConnection = getConnection();
    const job_post = await createJobPostService(dbConnection, req);
    res.status(job_post.status).json(job_post);
};

const getJobPostController = async (req, res) => {
    const dbConnection = getConnection();
  const job_post = await getJobPostService(dbConnection, req);
  res.status(job_post.status).json(job_post);
};

const getSpecificJobPostController = async (req, res) => {
    const dbConnection = getConnection();
  const data = await getSpecificJobPostService(dbConnection, req);
  res.status(data.status).json(data);
};

const updateSpecificJobPostController = async (req, res) => {
    const dbConnection = getConnection();
  const data = await updateSpecificJobPostService(dbConnection, req);
  res.status(data.status).json(data);
};

const deleteSpecificJobPostController = async (req, res) => {
    const dbConnection = getConnection();
  const data = await deleteSpecificJobPostService(dbConnection, req);
  res.status(data.status).json(data);
};

// Job Post Activity

const getJobPostActivityController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await getJobPostActivityService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    console.log(error)
    res.json(error);
  }
};

const createJobPostActivityController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const job = await createJobPostActivityService(dbConnection, req);
    res.status(job.status).json(job);
    // console.log(job);
  } catch (error) {
    res.json(error);
  }
};

const getSpecificJobPostActivityController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await getSpecificJobPostActivityService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const updateSpecificJobPostActivityController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await updateSpecificJobPostActivityService(dbConnection, req);
    res.status(data.status).json(data);
    console.log(data);
  } catch (error) {
    res.json(error);
  }
};

const deleteSpecificJobPostActivityController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await deleteSpecificJobPostActivityService(dbConnection, req);
    res.status(data.status).json(data);
    console.log(data);
  } catch (error) {
    res.json(error);
  }
};




// Job Interview levels

const getJobInterviewLevelController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await getJobInterviewLevelService(dbConnection, req);
    res.status(data.status).json(data);
    console.log(data);
  } catch (error) {
    res.json(error);
  }
};

const createJobInterviewLevelController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const job = await createJobInterviewLevelService(dbConnection, req);
    res.status(job.status).json(job);
  } catch (error) {
    res.json(error);
  }
};

const getSpecificJobInterviewLevelController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await getSpecificJobInterviewLevelService(dbConnection, req);
    res.status(data.status).json(data.data);
    console.log(data);
  } catch (error) {
    res.json(error);
  }
};

const updateSpecificJobInterviewLevelController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await updateSpecificJobInterviewLevelService(dbConnection, req);
    res.status(data.status).json(data);
    console.log(data);
  } catch (error) {
    res.json(error);
  }
};

const deleteSpecificJobInterviewLevelController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await deleteSpecificJobInterviewLevelService(dbConnection, req);
    res.status(data.status).json(data);
    console.log(data);
  } catch (error) {
    res.json(error);
  }
};



// Job Invitation 

const getJobInvitationController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await getJobInvitationService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const createJobInvitationController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const job = await createJobInvitationService(dbConnection, req);
    res.status(job.status).json(job);
  } catch (error) {
    res.json(error);
  }
};

const getSpecificJobInvitationController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await getSpecificJobInvitationService(dbConnection, req);
    res.status(data.status).json(data.data);
    console.log(data);
  } catch (error) {
    res.json(error);
  }
};

const updateSpecificJobInvitationController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await updateSpecificJobInvitationService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const deleteSpecificJobInvitationController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await deleteSpecificJobInvitationService(dbConnection, req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};
















// Not used APIS


// Applied jobs

const getAppliedJobsController = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const data = await getAppliedJobsService(dbConnection, req);
    // res.status(data.status).json(data);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};


// Job post skill set
const getJobPostSkillSetController = async (req, res) => {
  const job = await getJobPostSkillSetService(req);
  res.status(job.status).json(job);
};

const createJobPostSkillSetController = async (req, res) => {
  const job = await createJobPostSkillSetService(req);
  res.status(job.status).json(job);
};

const getSpecificJobPostSkillSetController = async (req, res) => {
  const data = await getSpecificJobPostSkillSetService(req);
  res.status(data.status).json(data.data);
};

const updateSpecificJobPostSkillSetController = async (req, res) => {
  const data = await updateSpecificJobPostSkillSetService(req);
  res.status(data.status).json(data);
};

const deleteSpecificJobPostSkillSetController = async (req, res) => {
  const data = await deleteSpecificJobPostSkillSetService(req);
  res.status(data.status).json(data);
};

// Job post action
const getJobPostActionController = async (req, res) => {
  const job = await getJobPostActionService(req);
  res.status(job.status).json(job);
};

const createJobPostActionController = async (req, res) => {
  const job = await createJobPostActionService(req);
  res.status(job.status).json(job);
};

const getSpecificJobPostActionController = async (req, res) => {
  const data = await getSpecificJobPostActionService(req);
  res.status(data.status).json(data.data);
};

const updateSpecificJobPostActionController = async (req, res) => {
  const data = await updateSpecificJobPostActionService(req);
  res.status(data.status).json(data);
};

const deleteSpecificJobPostActionController = async (req, res) => {
  const data = await deleteSpecificJobPostActionService(req);
  res.status(data.status).json(data);
};

// Job application status

const getJobApplicationStatusController = async (req, res) => {
  try {
    const data = await getJobApplicationStatusService(req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const createJobApplicationStatusController = (req, res) => {
  try {
    const job = createJobApplicationStatusService(req);
    res.status(job.status).json(job);
  } catch (error) {
    res.json(error);
  }
};

const getSpecificJobApplicationStatusController = async (req, res) => {
  try {
    const data = await getSpecificJobApplicationStatusService(req);
    res.status(data.status).json(data.data);
  } catch (error) {
    res.json(error);
  }
};

const updateSpecificJobApplicationStatusController = async (req, res) => {
  try {
    const data = await updateSpecificJobApplicationStatusService(req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};

const deleteSpecificJobApplicationStatusController = async (req, res) => {
  try {
    const data = await deleteSpecificJobApplicationStatusService(req);
    res.status(data.status).json(data);
  } catch (error) {
    res.json(error);
  }
};



// Job Post Activity log

const getJobPostActivityLogController = async (req, res) => {
  try {
    const data = await getJobPostActivityLogService(req);
    res.status(data.status).json(data);
    console.log(data);
  } catch (error) {
    res.json(error);
  }
};

const createJobPostActivityLogController = (req, res) => {
  try {
    const job = createJobPostActivityLogService(req);
    res.status(job.status).json(job);
    console.log(job);
  } catch (error) {
    res.json(error);
  }
};

const getSpecificJobPostActivityLogController = async (req, res) => {
  try {
    const data = await getSpecificJobPostActivityLogService(req);
    res.status(data.status).json(data.data);
    console.log(data);
  } catch (error) {
    res.json(error);
  }
};

const updateSpecificJobPostActivityLogController = async (req, res) => {
  try {
    const data = await updateSpecificJobPostActivityLogService(req);
    res.status(data.status).json(data);
    console.log(data);
  } catch (error) {
    res.json(error);
  }
};

const deleteSpecificJobPostActivityLogController = async (req, res) => {
  try {
    const data = await deleteSpecificJobPostActivityLogService(req);
    res.status(data.status).json(data);
    console.log(data);
  } catch (error) {
    res.json(error);
  }
};
export {
  createJobLocationController,
  getJobLocationController,
  getSpecificJobLocationController,
  updateSpecificJobLocationController,
  deleteSpecificJobLocationController,
  createJobCategoryController,
  getJobCategoryController,
  getSpecificJobCategoryController,
  updateSpecificJobCategoryController,
  deleteSpecificJobCategoryController,
  createJobPostController,
  getJobPostController,
  getSpecificJobPostController,
  updateSpecificJobPostController,
  deleteSpecificJobPostController,
  getJobPostSkillSetController,
  createJobPostSkillSetController,
  getSpecificJobPostSkillSetController,
  updateSpecificJobPostSkillSetController,
  deleteSpecificJobPostSkillSetController,
  getJobPostActionController,
  createJobPostActionController,
  getSpecificJobPostActionController,
  updateSpecificJobPostActionController,
  deleteSpecificJobPostActionController,
  getJobApplicationStatusController,
  createJobApplicationStatusController,
  getSpecificJobApplicationStatusController,
  updateSpecificJobApplicationStatusController,
  deleteSpecificJobApplicationStatusController,
  getJobPostActivityController,
  createJobPostActivityController,
  getSpecificJobPostActivityController,
  updateSpecificJobPostActivityController,
  deleteSpecificJobPostActivityController,
  getJobPostActivityLogController,
  createJobPostActivityLogController,
  getSpecificJobPostActivityLogController,
  updateSpecificJobPostActivityLogController,
  deleteSpecificJobPostActivityLogController,

  getAppliedJobsController,

  getJobInterviewLevelController,
  createJobInterviewLevelController,
  getSpecificJobInterviewLevelController,
  updateSpecificJobInterviewLevelController,
  deleteSpecificJobInterviewLevelController,
  
  getJobInvitationController,
  createJobInvitationController,
  getSpecificJobInvitationController,
  updateSpecificJobInvitationController,
  deleteSpecificJobInvitationController
};
