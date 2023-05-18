import { createActionTypes } from "@src/utility"

export const LOGIN_TYPES = createActionTypes("LOGIN", [
  "REQUEST",
  "SUCCESS",
  "FAILURE",
  "LOGOUT",
  "CLEAR_ERROR"
])
