import { JOB_CATEGORY_TYPES } from "./types"

export const getAllJobCategoriesRequest = (data) => ({
  type: JOB_CATEGORY_TYPES.GET_ALL_JOB_CATEGORIES_REQUEST,
  payload: data
})

export const getAllJobCategoriesSuccess = (data) => ({
  type: JOB_CATEGORY_TYPES.GET_ALL_JOB_CATEGORIES_SUCCESS,
  payload: data
})

export const getAllJobCategoriesFailure = (data) => ({
  type: JOB_CATEGORY_TYPES.GET_ALL_JOB_CATEGORIES_FAIL,
  payload: data
})

export const createJobCategoryRequest = (data) => ({
  type: JOB_CATEGORY_TYPES.CREATE_JOB_CATEGORY_REQUEST,
  payload: data
})

export const createJobCategorySuccess = (data) => ({
  type: JOB_CATEGORY_TYPES.CREATE_JOB_CATEGORY_SUCCESS,
  payload: data
})

export const createJobCategoryFailure = (data) => ({
  type: JOB_CATEGORY_TYPES.CREATE_JOB_CATEGORY_FAIL,
  payload: data
})

export const updateJobCategoryRequest = (data) => ({
  type: JOB_CATEGORY_TYPES.UPDATE_JOB_CATEGORY_REQUEST,
  payload: data
})

export const updateJobCategorySuccess = (data) => ({
  type: JOB_CATEGORY_TYPES.UPDATE_JOB_CATEGORY_SUCCESS,
  payload: data
})

export const updateJobCategoryFailure = (data) => ({
  type: JOB_CATEGORY_TYPES.UPDATE_JOB_CATEGORY_FAIL,
  payload: data
})

export const deleteJobCategoryRequest = (data) => ({
  type: JOB_CATEGORY_TYPES.DELETE_JOB_CATEGORY_REQUEST,
  payload: data
})

export const deleteJobCategorySuccess = (data) => ({
  type: JOB_CATEGORY_TYPES.DELETE_JOB_CATEGORY_SUCCESS,
  payload: data
})

export const deleteJobCategoryFailure = (data) => ({
  type: JOB_CATEGORY_TYPES.DELETE_JOB_CATEGORY_FAIL,
  payload: data
})
