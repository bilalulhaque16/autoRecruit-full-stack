import { Endpoints } from "./../config/endpoints"
import toast from "react-hot-toast"
import useJwt from "@src/auth/jwt/useJwt"

// export async function getData() {
//   return await get(config.apiUrl + "posts/")
// }
export async function login(data) {
  return await useJwt
    .post(Endpoints.login, data)
    .then((res) => res)
    .catch((err) => err)
}

export async function register(data) {
  return await useJwt
    .post(Endpoints.register, data)
    .then((res) => res.data)
    .catch((err) => err)
}

export async function verifyEmail(data) {
  return await useJwt
    .post(Endpoints.verifyEmail, data)
    .then((res) => res.data)
    .catch((err) => err)
}

export async function resendOtp(data) {
  return await useJwt
    .post(Endpoints.resendOtp, data)
    .then((res) => res)
    .catch((err) => err)
}

export async function forgotPassword(data) {
  return await useJwt
    .post(Endpoints.forgotPassword, data)
    .then((res) => res)
    .catch((err) => err)
}

export async function resetPasswordTokenVerify(data) {
  return await useJwt
    .get(`${Endpoints.resetPassword}/${data.token}`)
    .then((res) => res)
    .catch((err) => err)
}

export async function resetPassword(data) {
  return await useJwt
    .post(`${Endpoints.resetPassword}/${data.token}`, {
      password: `${data.password}`
    })
    .then((res) => res)
    .catch((err) => err)
}

export async function getAllJobs(data) {
  let params = ""
  if (data) {
    const { perPage, page, job_title, job_category } = data

    params += job_category ? `job_category=${job_category}` : ""
    params += perPage ? `perPage=${perPage}` : ""
    params += page ? `&page=${page}` : ""
    params += job_title ? `&job_title=${job_title}` : ""
    params = params ? `?${params}` : ""
  }
  return await useJwt
    .get(`${Endpoints.getAllJobs}${params}`)
    .then((res) => res.data)
    .catch((err) => err)
}

export async function getSpecificJob(data) {
  return await useJwt
    .get(`${Endpoints.getAllJobs}/${data.params}`)
    .then((res) => res.data)
    .catch((err) => err)
}

export async function getAppliedJobs(data) {
  let params = ""
  if (data) {
    const { perPage, page } = data
    params += perPage ? `perPage=${perPage}` : ""
    params += page ? `&page=${page}` : ""
    params = params ? `?${params}` : ""
  }
  return await useJwt
    .get(`${Endpoints.getAppliedJobs}${params}`)
    .then((res) => res.data)
    .catch((err) => err)
}

export async function getSpecificAppliedJob(data) {
  return await useJwt
    .get(`${Endpoints.getAppliedJobs}/${data.params}`)
    .then((res) => res.data)
    .catch((err) => err)
}

export async function applyForJob(data) {
  return await useJwt
    .post(Endpoints.getAppliedJobs, data)
    .then((res) => res.data)
    .catch((err) => err)
}

export async function getAllCountries() {
  return await useJwt
    .get(Endpoints.getAllCountries, { useBaseUrl: false })
    .then((res) => res.data)
    .catch((err) => err)
}

export async function getAllStates(data) {
  return await useJwt
    .post(Endpoints.getAllStates, data, { useBaseUrl: false })
    .then((res) => res.data)
    .catch((err) => err)
}

export async function getAllCities(data) {
  return await useJwt
    .post(Endpoints.getAllCities, data, { useBaseUrl: false })
    .then((res) => res.data)
    .catch((err) => err)
}

// export async function postResumeForm(data) {
//   return await useJwt
//     .post(Endpoints.postResumeForm, data)
//     .then((res) => res.data)
//     .catch((err) => err)
// }

// function to upload resume file to server using axios as form data when key is cv and value is file
export async function uploadResume(data) {
  const formData = new FormData()
  formData.append("cv", data)
  console.log("detailsss", data)
  return await useJwt
    .post(Endpoints.uploadResume, formData)
    .then((res) => res.data)
    .catch((err) => err)
}

// function to create profile data
export async function createProfile(data) {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data)
  // return await useJwt
  //   .post(Endpoints.createProfile, data)
  //   .then((res) => res)
  //   .catch((err) => err)
}

// function to get skills data
export async function getSkills() {
  return await useJwt
    .get(Endpoints.getSkills)
    .then((res) => res.data)
    .catch((err) => err)
}

// getAllJobCategories
// getSpecificJobCategory
// createJobCategory
// updateJobCategory
// deleteJobCategory

export async function getAllJobCategories(data) {
  let params = ""
  if (data) {
    const { perPage, page } = data
    params += perPage ? `perPage=${perPage}` : ""
    params += page ? `&page=${page}` : ""
    params = params ? `?${params}` : ""
  }
  return await useJwt
    .get(`${Endpoints.jobCategories}${params}`)
    .then((res) => res.data)
    .catch((err) => err)
}

export async function createJobCategory(data) {
  return await useJwt
    .post(Endpoints.jobCategories, data)
    .then((res) => res.data)
    .catch((err) => err)
}

export async function updateJobCategory(data) {
  return await useJwt
    .patch(`${Endpoints.jobCategories}/${data.params}`, data.body)
    .then((res) => res.data)
    .catch((err) => err)
}

export async function deleteJobCategory(data) {
  return await useJwt
    .delete(`${Endpoints.jobCategories}/${data.params}`)
    .then((res) => res.data)
    .catch((err) => err)
}

// post profile lnguages
export async function postProfileLanguages(data) {
  return await useJwt
    .post(Endpoints.getProfileLanguages, data)
    .then((res) => res.data)
    .catch((err) => err)
}

// post profile Education
export async function postProfileEducation(data) {
  return await useJwt
    .post(Endpoints.getProfileEducation, data)
    .then((res) => res.data)
    .catch((err) => err)
}

// post profile Experience
export async function postProfileExperience(data) {
  return await useJwt
    .post(Endpoints.getProfileExperience, data)
    .then((res) => res.data)
    .catch((err) => err)
}

// post profile Skillsets
export async function postProfileSkillsets(data) {
  return await useJwt
    .post(Endpoints.getProfileSkillsets, data)
    .then((res) => res.data)
    .catch((err) => err)
}

// delete skillset
export async function deleteSkillset(data) {
  return await useJwt
    .delete(`${Endpoints.getProfileSkillsets}/${data.params}`)
    .then((res) => res.data)
    .catch((err) => err)
}

// function to get profile data
export async function getProfile(data) {
  return await useJwt
    .get(`${Endpoints.getProfile}/${data.params}`)
    .then((res) => res.data)
    .catch((err) => err)
}

export async function getProfileExperience(data) {
  return await useJwt
    .get(`${Endpoints.getProfileExperience}/${data.params}`)
    .then((res) => res.data)
    .catch((err) => err)
}

export async function getProfileEducation(data) {
  return await useJwt
    .get(`${Endpoints.getProfileEducation}/${data.params}`)
    .then((res) => res.data)
    .catch((err) => err)
}

export async function getProfileSkillsets(data) {
  return await useJwt
    .get(`${Endpoints.getProfileSkillsets}/${data.params}`)
    .then((res) => res.data)
    .catch((err) => err)
}

export async function getProfileLanguages(data) {
  return await useJwt
    .get(`${Endpoints.getProfileLanguages}/${data.params}`)
    .then((res) => res.data)
    .catch((err) => err)
}

// update experience
export async function updateProfileExperience(data) {
  return await useJwt
    .patch(`${Endpoints.getProfileExperience}/${data.params}`, data.body)
    .then((res) => res.data)
    .catch((err) => err)
}

// update education
export async function updateProfileEducation(data) {
  return await useJwt
    .patch(`${Endpoints.getProfileEducation}/${data.params}`, data.body)
    .then((res) => res.data)
    .catch((err) => err)
}

// update skillset
export async function updateProfileSkillset(data) {
  return await useJwt
    .patch(`${Endpoints.getProfileSkillsets}/${data.params}`, data.body)
    .then((res) => res.data)
    .catch((err) => err)
}

// update language
export async function updateProfileLanguage(data) {
  return await useJwt
    .patch(`${Endpoints.getProfileLanguages}/${data.params}`, data.body)
    .then((res) => res.data)
    .catch((err) => err)
}

// company profile

export async function companyProfile(data) {
  return await useJwt
    .get(`${Endpoints.companyProfile}/${data.params}`)
    .then((res) => res.data)
    .catch((err) => err)
}

export async function updateProfile(data) {
  console.log("data", data)
  return await useJwt
    .patch(`${Endpoints.companyProfile}/${data.params}`, data.body)
    .then((res) => res.data)
    .catch((err) => err)
}

export async function postJob(data) {
  return await useJwt
    .post(Endpoints.getAllJobs, data)
    .then((res) => res.data)
    .catch((err) => err)
}
