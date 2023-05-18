import { JOBS_ACTION_TYPES } from "./types"

export const getAllJobsRequest = (data) => ({
  type: JOBS_ACTION_TYPES.GET_ALL_JOBS_REQUEST,
  payload: data
})

export const getAllJobsSuccess = (data) => ({
  type: JOBS_ACTION_TYPES.GET_ALL_JOBS_SUCCESS,
  payload: data
})

export const getAllJobsFailure = (data) => ({
  type: JOBS_ACTION_TYPES.GET_ALL_JOBS_FAIL,
  payload: data
})

export const clearSpecificJob = () => ({
  type: JOBS_ACTION_TYPES.CLEAR_SPECIFIC_JOB
})

export const getSpecificJobRequest = (data) => ({
  type: JOBS_ACTION_TYPES.GET_SPECIFIC_JOB_REQUEST,
  payload: data
})

export const getSpecificJobSuccess = (data) => ({
  type: JOBS_ACTION_TYPES.GET_SPECIFIC_JOB_SUCCESS,
  payload: data
})

export const getSpecificJobFailure = (data) => ({
  type: JOBS_ACTION_TYPES.GET_SPECIFIC_JOB_FAIL,
  payload: data
})

export const applyForJobRequest = (data) => ({
  type: JOBS_ACTION_TYPES.APPLY_FOR_JOB_REQUEST,
  payload: data
})

export const applyForJobSuccess = (data) => ({
  type: JOBS_ACTION_TYPES.APPLY_FOR_JOB_SUCCESS,
  payload: data
})

export const applyForJobFailure = (data) => ({
  type: JOBS_ACTION_TYPES.APPLY_FOR_JOB_FAIL,
  payload: data
})

export const saveJobAsDraftRequest = (data) => ({
  type: JOBS_ACTION_TYPES.SAVE_JOB_AS_DRAFT_REQUEST,
  payload: data
})

export const saveJobAsDraftSuccess = (data) => ({
  type: JOBS_ACTION_TYPES.SAVE_JOB_AS_DRAFT_SUCCESS,
  payload: data
})

export const saveJobAsDraftFailure = (data) => ({
  type: JOBS_ACTION_TYPES.SAVE_JOB_AS_DRAFT_FAIL,
  payload: data
})

export const getAllAppliedJobsRequest = (data) => ({
  type: JOBS_ACTION_TYPES.GET_ALL_APPLIED_JOBS_REQUEST,
  payload: data
})

export const getAllAppliedJobsSuccess = (data) => ({
  type: JOBS_ACTION_TYPES.GET_ALL_APPLIED_JOBS_SUCCESS,
  payload: data
})

export const getAllAppliedJobsFailure = (data) => ({
  type: JOBS_ACTION_TYPES.GET_ALL_APPLIED_JOBS_FAIL,
  payload: data
})

export const getSpecificAppliedJobRequest = (data) => ({
  type: JOBS_ACTION_TYPES.GET_SPECIFIC_APPLIED_JOB_REQUEST,
  payload: data
})

export const getSpecificAppliedJobSuccess = (data) => ({
  type: JOBS_ACTION_TYPES.GET_SPECIFIC_APPLIED_JOB_SUCCESS,
  payload: data
})

export const getSpecificAppliedJobFailure = (data) => ({
  type: JOBS_ACTION_TYPES.GET_SPECIFIC_APPLIED_JOB_FAIL,
  payload: data
})

export const resetApplyForJob = () => ({
  type: JOBS_ACTION_TYPES.RESET_APPLY_FOR_JOB
})

export const clearSpecificAppliedJob = () => ({
  type: JOBS_ACTION_TYPES.CLEAR_SPECIFIC_APPLIED_JOB
})

export const createJobRequest = (data) => ({
  type: JOBS_ACTION_TYPES.CREATE_JOB_REQUEST,
  payload: data
})

export const createJobSuccess = (data) => ({
  type: JOBS_ACTION_TYPES.CREATE_JOB_SUCCESS,
  payload: data
})

export const createJobFailure = (data) => ({
  type: JOBS_ACTION_TYPES.CREATE_JOB_FAIL,
  payload: data
})

export const resetCreateJob = () => ({
  type: JOBS_ACTION_TYPES.RESET_CREATE_JOB
})

export const resetGetAllJobs = () => ({
  type: JOBS_ACTION_TYPES.RESET_GET_ALL_JOBS
})
