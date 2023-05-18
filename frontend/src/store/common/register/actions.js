import { REGISTER_TYPES } from "./types"

export const registerRequest = (data) => ({
  type: REGISTER_TYPES.REQUEST,
  payload: data
})

export const registerSuccess = (data) => ({
  type: REGISTER_TYPES.SUCCESS,
  payload: data
})

export const registerFailure = (data) => ({
  type: REGISTER_TYPES.FAILURE,
  payload: data
})
