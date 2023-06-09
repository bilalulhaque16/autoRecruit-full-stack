import { createActionTypes } from "@src/utility"

export const JOB_CATEGORY_TYPES = createActionTypes("job_category", [
  "GET_ALL_JOB_CATEGORIES_REQUEST",
  "GET_ALL_JOB_CATEGORIES_SUCCESS",
  "GET_ALL_JOB_CATEGORIES_FAIL",

  "CREATE_JOB_CATEGORY_REQUEST",
  "CREATE_JOB_CATEGORY_SUCCESS",
  "CREATE_JOB_CATEGORY_FAIL",
  "UPDATE_JOB_CATEGORY_REQUEST",
  "UPDATE_JOB_CATEGORY_SUCCESS",
  "UPDATE_JOB_CATEGORY_FAIL",
  "DELETE_JOB_CATEGORY_REQUEST",
  "DELETE_JOB_CATEGORY_SUCCESS",
  "DELETE_JOB_CATEGORY_FAIL"
])
