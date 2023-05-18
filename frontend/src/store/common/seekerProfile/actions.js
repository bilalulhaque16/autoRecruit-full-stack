import { SEEKER_PROFILE_TYPES } from "./types"

export const getProfileRequest = (data) => ({
  type: SEEKER_PROFILE_TYPES.GET_PROFILE_REQUEST,
  payload: data
})

export const getProfileSuccess = (data) => ({
  type: SEEKER_PROFILE_TYPES.GET_PROFILE_SUCCESS,
  payload: data
})

export const getProfileFailure = (data) => ({
  type: SEEKER_PROFILE_TYPES.GET_PROFILE_FAILURE,
  payload: data
})

export const getEducationRequest = (data) => ({
  type: SEEKER_PROFILE_TYPES.GET_EDUCATION_REQUEST,
  payload: data
})

export const getEducationSuccess = (data) => ({
  type: SEEKER_PROFILE_TYPES.GET_EDUCATION_SUCCESS,
  payload: data
})

export const getEducationFailure = (data) => ({
  type: SEEKER_PROFILE_TYPES.GET_EDUCATION_FAILURE,
  payload: data
})

export const getExperienceRequest = (data) => ({
  type: SEEKER_PROFILE_TYPES.GET_EXPERIENCE_REQUEST,
  payload: data
})

export const getExperienceSuccess = (data) => ({
  type: SEEKER_PROFILE_TYPES.GET_EXPERIENCE_SUCCESS,
  payload: data
})

export const getExperienceFailure = (data) => ({
  type: SEEKER_PROFILE_TYPES.GET_EXPERIENCE_FAILURE,
  payload: data
})

export const getLanguagesRequest = (data) => ({
  type: SEEKER_PROFILE_TYPES.GET_LANGUAGES_REQUEST,
  payload: data
})

export const getLanguagesSuccess = (data) => ({
  type: SEEKER_PROFILE_TYPES.GET_LANGUAGES_SUCCESS,
  payload: data
})

export const getLanguagesFailure = (data) => ({
  type: SEEKER_PROFILE_TYPES.GET_LANGUAGES_FAILURE,
  payload: data
})

export const getSkillsRequest = () => ({
  type: SEEKER_PROFILE_TYPES.GET_SKILLS_REQUEST
})

export const getSkillsSuccess = (data) => ({
  type: SEEKER_PROFILE_TYPES.GET_SKILLS_SUCCESS,
  payload: data
})

export const getSkillsFailure = (data) => ({
  type: SEEKER_PROFILE_TYPES.GET_SKILLS_FAILURE,
  payload: data
})

export const postEducationRequest = (data) => ({
  type: SEEKER_PROFILE_TYPES.POST_EDUCATION_REQUEST,
  payload: data
})

export const postEducationSuccess = (data) => ({
  type: SEEKER_PROFILE_TYPES.POST_EDUCATION_SUCCESS,
  payload: data
})

export const postEducationFailure = (data) => ({
  type: SEEKER_PROFILE_TYPES.POST_EDUCATION_FAILURE,
  payload: data
})

export const postExperienceRequest = (data) => ({
  type: SEEKER_PROFILE_TYPES.POST_EXPERIENCE_REQUEST,
  payload: data
})

export const postExperienceSuccess = (data) => ({
  type: SEEKER_PROFILE_TYPES.POST_EXPERIENCE_SUCCESS,
  payload: data
})

export const postExperienceFailure = (data) => ({
  type: SEEKER_PROFILE_TYPES.POST_EXPERIENCE_FAILURE,
  payload: data
})

export const postLanguagesRequest = (data) => ({
  type: SEEKER_PROFILE_TYPES.POST_LANGUAGES_REQUEST,
  payload: data
})

export const postLanguagesSuccess = (data) => ({
  type: SEEKER_PROFILE_TYPES.POST_LANGUAGES_SUCCESS,
  payload: data
})

export const postLanguagesFailure = (data) => ({
  type: SEEKER_PROFILE_TYPES.POST_LANGUAGES_FAILURE,
  payload: data
})

export const postSkillsRequest = (data) => ({
  type: SEEKER_PROFILE_TYPES.POST_SKILLS_REQUEST,
  payload: data
})

export const postSkillsSuccess = (data) => ({
  type: SEEKER_PROFILE_TYPES.POST_SKILLS_SUCCESS,
  payload: data
})

export const postSkillsFailure = (data) => ({
  type: SEEKER_PROFILE_TYPES.POST_SKILLS_FAILURE,
  payload: data
})

// PATCH
export const patchEducationRequest = (data) => ({
  type: SEEKER_PROFILE_TYPES.PATCH_EDUCATION_REQUEST,
  payload: data
})

export const patchEducationSuccess = (data) => ({
  type: SEEKER_PROFILE_TYPES.PATCH_EDUCATION_SUCCESS,
  payload: data
})

export const patchEducationFailure = (data) => ({
  type: SEEKER_PROFILE_TYPES.PATCH_EDUCATION_FAILURE,
  payload: data
})

export const patchExperienceRequest = (data) => ({
  type: SEEKER_PROFILE_TYPES.PATCH_EXPERIENCE_REQUEST,
  payload: data
})

export const patchExperienceSuccess = (data) => ({
  type: SEEKER_PROFILE_TYPES.PATCH_EXPERIENCE_SUCCESS,
  payload: data
})

export const patchExperienceFailure = (data) => ({
  type: SEEKER_PROFILE_TYPES.PATCH_EXPERIENCE_FAILURE,
  payload: data
})

export const patchLanguagesRequest = (data) => ({
  type: SEEKER_PROFILE_TYPES.PATCH_LANGUAGES_REQUEST,
  payload: data
})

export const patchLanguagesSuccess = (data) => ({
  type: SEEKER_PROFILE_TYPES.PATCH_LANGUAGES_SUCCESS,
  payload: data
})

export const patchLanguagesFailure = (data) => ({
  type: SEEKER_PROFILE_TYPES.PATCH_LANGUAGES_FAILURE,
  payload: data
})

export const patchSkillsRequest = (data) => ({
  type: SEEKER_PROFILE_TYPES.PATCH_SKILLS_REQUEST,
  payload: data
})

export const patchSkillsSuccess = (data) => ({
  type: SEEKER_PROFILE_TYPES.PATCH_SKILLS_SUCCESS,
  payload: data
})

export const patchSkillsFailure = (data) => ({
  type: SEEKER_PROFILE_TYPES.PATCH_SKILLS_FAILURE,
  payload: data
})

export const clearResponse = () => ({
  type: SEEKER_PROFILE_TYPES.CLEAR_RESPONSE
})

// DELETE skills
export const deleteSkillsRequest = (data) => ({
  type: SEEKER_PROFILE_TYPES.DELETE_SKILLS_REQUEST,
  payload: data
})

export const deleteSkillsSuccess = (data) => ({
  type: SEEKER_PROFILE_TYPES.DELETE_SKILLS_SUCCESS,
  payload: data
})

export const deleteSkillsFailure = (data) => ({
  type: SEEKER_PROFILE_TYPES.DELETE_SKILLS_FAILURE,
  payload: data
})
