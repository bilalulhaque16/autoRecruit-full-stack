import { createActionTypes } from "@src/utility"

export const REGISTER_TYPES = createActionTypes("REGISTER", [
  "REQUEST",
  "SUCCESS",
  "FAILURE"
])
