import { PROFILE_TYPES } from "./types"

//Experience Actions
export const getProfileExperienceRequest = (data) => ({
  type: PROFILE_TYPES.GET_PROFILE_EXPERIENCE_REQUEST,
  payload: data
})

export const getProfileExperienceSuccess = (data) => ({
  type: PROFILE_TYPES.GET_PROFILE_EXPERIENCE_SUCCESS,
  payload: data
})

export const getProfileExperienceFailure = (data) => ({
  type: PROFILE_TYPES.GET_PROFILE_EXPERIENCE_FAILURE,
  payload: data
})

//Education Actions
export const getProfileEducationRequest = (data) => ({
  type: PROFILE_TYPES.GET_PROFILE_EDUCATION_REQUEST,
  payload: data
})

export const getProfileEducationSuccess = (data) => ({
  type: PROFILE_TYPES.GET_PROFILE_EDUCATION_SUCCESS,
  payload: data
})

export const getProfileEducationFailure = (data) => ({
  type: PROFILE_TYPES.GET_PROFILE_EDUCATION_FAILURE,
  payload: data
})

//Skills Actions
export const getProfileSkillsRequest = (data) => ({
  type: PROFILE_TYPES.GET_PROFILE_SKILLS_REQUEST,
  payload: data
})

export const getProfileSkillsSuccess = (data) => ({
  type: PROFILE_TYPES.GET_PROFILE_SKILLS_SUCCESS,
  payload: data
})

export const getProfileSkillsFailure = (data) => ({
  type: PROFILE_TYPES.GET_PROFILE_SKILLS_FAILURE,
  payload: data
})

//languages Actions
export const getProfileLanguagesRequest = (data) => ({
  type: PROFILE_TYPES.GET_PROFILE_LANGUAGES_REQUEST,
  payload: data
})

export const getProfileLanguagesSuccess = (data) => ({
  type: PROFILE_TYPES.GET_PROFILE_LANGUAGES_SUCCESS,
  payload: data
})

export const getProfileLanguagesFailure = (data) => ({
  type: PROFILE_TYPES.GET_PROFILE_LANGUAGES_FAILURE,
  payload: data
})

//languages Actions POST
export const postProfileLanguagesRequest = (data) => ({
  type: PROFILE_TYPES.POST_PROFILE_LANGUAGES_REQUEST,
  payload: data
})

export const postProfileLanguagesSuccess = (data) => ({
  type: PROFILE_TYPES.POST_PROFILE_LANGUAGES_SUCCESS,
  payload: data
})

export const postProfileLanguagesFailure = (data) => ({
  type: PROFILE_TYPES.POST_PROFILE_LANGUAGES_FAILURE,
  payload: data
})

//EDUCATION ACTION POST
export const postProfileEducationRequest = (data) => ({
  type: PROFILE_TYPES.POST_PROFILE_EDUCATION_REQUEST,
  payload: data
})

export const postProfileEducationSuccess = (data) => ({
  type: PROFILE_TYPES.POST_PROFILE_EDUCATION_SUCCESS,
  payload: data
})

export const postProfileEducationFailure = (data) => ({
  type: PROFILE_TYPES.POST_PROFILE_EDUCATION_FAILURE,
  payload: data
})

//EXPERIENCE ACTION POST
export const postProfileExperienceRequest = (data) => ({
  type: PROFILE_TYPES.POST_PROFILE_EXPERIENCE_REQUEST,
  payload: data
})

export const postProfileExperienceSuccess = (data) => ({
  type: PROFILE_TYPES.POST_PROFILE_EXPERIENCE_SUCCESS,
  payload: data
})

export const postProfileExperienceFailure = (data) => ({
  type: PROFILE_TYPES.POST_PROFILE_EXPERIENCE_FAILURE,
  payload: data
})
