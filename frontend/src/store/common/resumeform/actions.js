import { RESUME_FORM_ACTION_TYPES } from "./types"

export const getAllCountriesRequest = () => ({
  type: RESUME_FORM_ACTION_TYPES.GET_ALL_COUNTRIES_REQUEST
})

export const getAllCountriesSuccess = (data) => ({
  type: RESUME_FORM_ACTION_TYPES.GET_ALL_COUNTRIES_SUCCESS,
  payload: data
})

export const getAllCountriesFailure = (data) => ({
  type: RESUME_FORM_ACTION_TYPES.GET_ALL_COUNTRIES_FAIL,
  payload: data
})

export const postResumeFormRequest = (data) => ({
  type: RESUME_FORM_ACTION_TYPES.POST_RESUME_FORM_REQUEST,
  payload: data
})

export const postResumeFormSuccess = (data) => ({
  type: RESUME_FORM_ACTION_TYPES.POST_RESUME_FORM_SUCCESS,
  payload: data
})

export const postResumeFormFailure = (data) => ({
  type: RESUME_FORM_ACTION_TYPES.POST_RESUME_FORM_FAIL,
  payload: data
})

export const uploadResumeRequest = (data) => ({
  type: RESUME_FORM_ACTION_TYPES.UPLOAD_RESUME_REQUEST,
  payload: data
})

export const uploadResumeSuccess = (data) => ({
  type: RESUME_FORM_ACTION_TYPES.UPLOAD_RESUME_SUCCESS,
  payload: data
})

export const uploadResumeFailure = (data) => ({
  type: RESUME_FORM_ACTION_TYPES.UPLOAD_RESUME_FAIL,
  payload: data
})

export const removeResumeUrl = () => ({
  type: RESUME_FORM_ACTION_TYPES.REMOVE_RESUME_URL
})

export const clearResumeForm = () => ({
  type: RESUME_FORM_ACTION_TYPES.CLEAR_RESUME_FORM
})

export const setfutureNavigation = (data) => ({
  type: RESUME_FORM_ACTION_TYPES.FUTURE_NAVIGATION,
  payload: data
})

export const getAllStatesRequest = (data) => ({
  type: RESUME_FORM_ACTION_TYPES.GET_ALL_STATES_REQUEST,
  payload: data
})

export const getAllStatesSuccess = (data) => ({
  type: RESUME_FORM_ACTION_TYPES.GET_ALL_STATES_SUCCESS,
  payload: data
})

export const getAllStatesFailure = (data) => ({
  type: RESUME_FORM_ACTION_TYPES.GET_ALL_STATES_FAIL,
  payload: data
})

export const getAllCitiesRequest = (data) => ({
  type: RESUME_FORM_ACTION_TYPES.GET_ALL_CITIES_REQUEST,
  payload: data
})

export const getAllCitiesSuccess = (data) => ({
  type: RESUME_FORM_ACTION_TYPES.GET_ALL_CITIES_SUCCESS,
  payload: data
})

export const getAllCitiesFailure = (data) => ({
  type: RESUME_FORM_ACTION_TYPES.GET_ALL_CITIES_FAIL,
  payload: data
})
