import { AUTH_TYPES } from "./types"

export const verifyEmailRequest = (data) => ({
  type: AUTH_TYPES.VERIFY_EMAIL_REQUEST,
  payload: data
})

export const verifyEmailSuccess = (data) => ({
  type: AUTH_TYPES.VERIFY_EMAIL_SUCCESS,
  payload: data
})

export const verifyEmailFailure = (data) => ({
  type: AUTH_TYPES.VERIFY_EMAIL_FAILURE,
  payload: data
})

export const clearVerifyEmail = () => ({
  type: AUTH_TYPES.CLEAR_VERIFY_EMAIL
})

export const resendOtpRequest = (data) => ({
  type: AUTH_TYPES.RESEND_OTP_REQUEST,
  payload: data
})

export const resendOtpSuccess = (data) => ({
  type: AUTH_TYPES.RESEND_OTP_SUCCESS,
  payload: data
})

export const resendOtpFailure = (data) => ({
  type: AUTH_TYPES.RESEND_OTP_FAILURE,
  payload: data
})

export const clearResendOtp = () => ({
  type: AUTH_TYPES.CLEAR_RESEND_OTP
})

export const forgotPasswordRequest = (data) => ({
  type: AUTH_TYPES.FORGOT_PASSWORD_REQUEST,
  payload: data
})

export const forgotPasswordSuccess = (data) => ({
  type: AUTH_TYPES.FORGOT_PASSWORD_SUCCESS,
  payload: data
})

export const forgotPasswordFailure = (data) => ({
  type: AUTH_TYPES.FORGOT_PASSWORD_FAILURE,
  payload: data
})

export const clearForgotPassword = () => ({
  type: AUTH_TYPES.CLEAR_FORGOT_PASSWORD
})

export const resetPasswordRequest = (data) => ({
  type: AUTH_TYPES.RESET_PASSWORD_REQUEST,
  payload: data
})

export const resetPasswordSuccess = (data) => ({
  type: AUTH_TYPES.RESET_PASSWORD_SUCCESS,
  payload: data
})

export const resetPasswordFailure = (data) => ({
  type: AUTH_TYPES.RESET_PASSWORD_FAILURE,
  payload: data
})

export const clearResetPassword = () => ({
  type: AUTH_TYPES.CLEAR_RESET_PASSWORD
})

export const resetPasswordTokenVerifyRequest = (data) => ({
  type: AUTH_TYPES.RESET_PASSWORD_TOKEN_VERIFY_REQUEST,
  payload: data
})

export const resetPasswordTokenVerifySuccess = (data) => ({
  type: AUTH_TYPES.RESET_PASSWORD_TOKEN_VERIFY_SUCCESS,
  payload: data
})

export const resetPasswordTokenVerifyFailure = (data) => ({
  type: AUTH_TYPES.RESET_PASSWORD_TOKEN_VERIFY_FAILURE,
  payload: data
})

export const clearResetPasswordTokenVerify = () => ({
  type: AUTH_TYPES.CLEAR_RESET_PASSWORD_TOKEN_VERIFY
})

// export const loginRequest = (data) => ({
//   type: LOGIN_TYPES.REQUEST,
//   payload: data
// })

// export const loginSuccess = (data) => ({
//   type: LOGIN_TYPES.SUCCESS,
//   payload: data
// })

// export const loginFailure = (data) => ({
//   type: LOGIN_TYPES.FAILURE,
//   payload: data
// })
