import { createActionTypes } from "@src/utility"

export const COMPANY_PROFILE_TYPES = createActionTypes(
  "COMPANY_PROFILE_TYPES",
  [
    "GET_COMPANY_PROFILE_REQUEST",
    "GET_COMPANY_PROFILE_SUCCESS",
    "GET_COMPANY_PROFILE_FAILED",
    "POST_COMPANY_PROFILE_REQUEST",
    "POST_COMPANY_PROFILE_SUCCESS",
    "POST_COMPANY_PROFILE_FAILED",
    "UPDATE_COMPANY_PROFILE_REQUEST",
    "UPDATE_COMPANY_PROFILE_SUCCESS",
    "UPDATE_COMPANY_PROFILE_FAILED"
  ]
)
