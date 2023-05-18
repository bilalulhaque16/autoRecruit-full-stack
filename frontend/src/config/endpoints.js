import { verifyEmail } from "@src/services/apis"

export const Endpoints = {
  // ** Common
  // ** Auth
  login: "/auth/signin",
  register: "/auth/signup",
  refresh: "/auth/refresh-token",
  logout: "/auth/logout",
  verifyEmail: "/auth/verifyOTP",
  resendOtp: "/auth/resendOTP",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",

  // getAllJobs,
  //   getSpecificJob,
  //   applyForJob,
  //   saveJobAsDraft

  // ** Jobs
  getAllJobs: "/job/job_post", // get all jobs that are posted by company ,add id in params to get specific job
  getAppliedJobs: "/job/job_post_activity", // get all jobs that are applied by user ,add id in params to get specific job {GET} and apply for job {POST}
  // countries
  //getAllCountries: "https://restcountries.com/v2/all",
  getAllCountries: "https://countriesnow.space/api/v0.1/countries/capital",
  // states
  getAllStates: "https://countriesnow.space/api/v0.1/countries/states",
  // cities
  getAllCities: "https://countriesnow.space/api/v0.1/countries/state/cities",
  // resume
  // uploadResume: "/seeker_profile/upload_cv",
  uploadResume: "/seeker_profile/categorize_cv_with_ai",

  // profile
  getProfile: "/seeker_profile/profile",
  // create profile
  createProfile: "/seeker_profile/create_whole_profile",

  // JOB CATEGORY {GET} , {POST} , {PATCH} , {DELETE}
  jobCategories: "/job/job_category",
  // skills
  getSkills: "/seeker_profile/skill_set",

  //get profile experience
  getProfileExperience: "/seeker_profile/experience_details",
  //get profile experience
  getProfileEducation: "/seeker_profile/education_details",
  //get profile SKillsets
  getProfileSkillsets: "/seeker_profile/seeker_skill_set",
  //get profile Languages
  getProfileLanguages: "/seeker_profile/seeker_languages",

  companyProfile: "/company"
}
