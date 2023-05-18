import { COMPANY_PROFILE_TYPES } from "./types"

export const getCompanyProfileRequest = (data) => ({
  type: COMPANY_PROFILE_TYPES.GET_COMPANY_PROFILE_REQUEST,
  payload: data
})

export const getCompanyProfileSuccess = (data) => ({
  type: COMPANY_PROFILE_TYPES.GET_COMPANY_PROFILE_SUCCESS,
  payload: data
})

export const getCompanyProfileFailure = (data) => ({
  type: COMPANY_PROFILE_TYPES.GET_COMPANY_PROFILE_FAILED,
  payload: data
})

export const updateCompanyProfileRequest = (data) => ({
  type: COMPANY_PROFILE_TYPES.UPDATE_COMPANY_PROFILE_REQUEST,
  payload: data
})

export const updateCompanyProfileSuccess = (data) => ({
  type: COMPANY_PROFILE_TYPES.UPDATE_COMPANY_PROFILE_SUCCESS,
  payload: data
})

export const updateCompanyProfileFailure = (data) => ({
  type: COMPANY_PROFILE_TYPES.UPDATE_COMPANY_PROFILE_FAILED,
  payload: data
})

export const postCompanyProfileRequest = (data) => ({
  type: COMPANY_PROFILE_TYPES.POST_COMPANY_PROFILE_REQUEST,
  payload: data
})

export const postCompanyProfileSuccess = (data) => ({
  type: COMPANY_PROFILE_TYPES.POST_COMPANY_PROFILE_SUCCESS,
  payload: data
})

export const postCompanyProfileFailure = (data) => ({
  type: COMPANY_PROFILE_TYPES.POST_COMPANY_PROFILE_FAILED,
  payload: data
})
