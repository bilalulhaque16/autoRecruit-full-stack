import { LOGIN_TYPES } from "./types"

export const loginRequest = (data) => ({
  type: LOGIN_TYPES.REQUEST,
  payload: data
})

export const loginSuccess = (data) => ({
  type: LOGIN_TYPES.SUCCESS,
  payload: data
})

export const loginFailure = (data) => ({
  type: LOGIN_TYPES.FAILURE,
  payload: data
})

export const logout = () => ({
  type: LOGIN_TYPES.LOGOUT
})

export const clearError = () => ({
  type: LOGIN_TYPES.CLEAR_ERROR
})
