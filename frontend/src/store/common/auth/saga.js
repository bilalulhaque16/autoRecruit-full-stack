import * as authActions from "./actions"

import { all, call, put, takeEvery } from "redux-saga/effects"
import {
  forgotPassword,
  resendOtp,
  resetPassword,
  resetPasswordTokenVerify,
  verifyEmail
} from "@src/services/apis"

import { AUTH_TYPES } from "./types"

function* verifyEmailRequest(action) {
  try {
    const response = yield call(verifyEmail, action.payload)

    if (response?.response?.data?.status === 401) {
      yield put(
        authActions.verifyEmailFailure({
          status: response.response.data.status,
          message: response.response.data.message
        })
      )
    } else if (response?.status === 200) {
      yield put(authActions.verifyEmailSuccess(response))
    } else if (response?.status === 204) {
      yield put(
        authActions.verifyEmailFailure({
          message: "Invalid Credentials",
          status: 204
        })
      )
    } else if (response?.status === 500) {
      yield put(
        authActions.verifyEmailFailure({
          message: "Server Error",
          status: 500
        })
      )
    } else if (response?.status === 404) {
      yield put(
        authActions.verifyEmailFailure({
          message: "Not Found",
          status: 404
        })
      )
    } else {
      yield put(
        authActions.verifyEmailFailure({
          message: "Something went wrong",
          status: 500
        })
      )
    }
  } catch (err) {
    yield put(authActions.verifyEmailFailure(err))
  }
}

function* resendOtpRequest(action) {
  try {
    const response = yield call(resendOtp, action.payload)
    if (response?.response?.data?.status === 401) {
      yield put(
        authActions.resendOtpFailure({
          status: response.response.data.status,
          message: response.response.data.message
        })
      )
    } else if (response?.data?.status === 200) {
      yield put(authActions.resendOtpSuccess(response.data.data))
    } else if (response?.status === 204) {
      yield put(
        authActions.resendOtpFailure({
          message: "Invalid Email",
          status: 204
        })
      )
    } else if (response?.status === 500) {
      yield put(
        authActions.resendOtpFailure({
          message: "Server Error",
          status: 500
        })
      )
    } else if (response?.status === 404) {
      yield put(
        authActions.resendOtpFailure({
          message: "Not Found",
          status: 404
        })
      )
    } else {
      yield put(
        authActions.resendOtpFailure({
          message: "Something went wrong",
          status: 500
        })
      )
    }

    yield put(authActions.resendOtpSuccess(response.data))
  } catch (err) {
    yield put(authActions.resendOtpFailure(err))
  }
}

function* forgotPasswordRequest(action) {
  try {
    const response = yield call(forgotPassword, action.payload)
    if (response?.status === 200) {
      yield put(authActions.forgotPasswordSuccess(response.data))
    } else if (response?.status === 204) {
      yield put(authActions.forgotPasswordFailure("Email not found"))
    } else if (response?.status === 500) {
      yield put(authActions.forgotPasswordFailure("Server Error"))
    } else {
      yield put(authActions.forgotPasswordFailure("Something went wrong"))
    }
  } catch (err) {
    yield put(authActions.forgotPasswordFailure(err))
  }
}

function* resetPasswordTokenVerifyRequest(action) {
  try {
    const response = yield call(resetPasswordTokenVerify, action.payload)
    if (response?.response?.data?.status === 401) {
      yield put(
        authActions.resetPasswordTokenVerifyFailure({
          status: response.response.data.status,
          message: response.response.data.message
        })
      )
    } else if (response?.data?.status === 200) {
      yield put(authActions.resetPasswordTokenVerifySuccess(response.data.data))
    } else if (response?.status === 204) {
      yield put(
        authActions.resetPasswordTokenVerifyFailure({
          message: "Invalid Credentials",
          status: 204
        })
      )
    } else if (response?.status === 500) {
      yield put(
        authActions.resetPasswordTokenVerifyFailure({
          message: "Server Error",
          status: 500
        })
      )
    } else if (response?.status === 404) {
      yield put(
        authActions.resetPasswordTokenVerifyFailure({
          message: "Not Found",
          status: 404
        })
      )
    } else {
      yield put(
        authActions.resetPasswordTokenVerifyFailure({
          message: "Something went wrong",
          status: 500
        })
      )
    }
  } catch (err) {
    yield put(authActions.resetPasswordTokenVerifyFailure(err))
  }
}

function* resetPasswordRequest(action) {
  try {
    const response = yield call(resetPassword, action.payload)
    if (response?.response?.data?.status === 401) {
      yield put(
        authActions.resetPasswordFailure({
          status: response.response.data.status,
          message: response.response.data.message
        })
      )
    } else if (response?.data?.status === 200) {
      yield put(authActions.resetPasswordSuccess(response.data))
    } else if (response?.status === 204) {
      yield put(
        authActions.resetPasswordFailure({
          message: "Invalid Credentials",
          status: 204
        })
      )
    } else if (response?.status === 500) {
      yield put(
        authActions.resetPasswordFailure({
          message: "Server Error",
          status: 500
        })
      )
    } else if (response?.status === 404) {
      yield put(
        authActions.resetPasswordFailure({
          message: "Not Found",
          status: 404
        })
      )
    } else {
      yield put(
        authActions.resetPasswordFailure({
          message: "Something went wrong",
          status: 500
        })
      )
    }
  } catch (err) {
    yield put(authActions.resetPasswordFailure(err))
  }
}

function* AuthWatcherSaga() {
  yield all([
    takeEvery(AUTH_TYPES.VERIFY_EMAIL_REQUEST, verifyEmailRequest),
    takeEvery(AUTH_TYPES.RESEND_OTP_REQUEST, resendOtpRequest),
    takeEvery(AUTH_TYPES.FORGOT_PASSWORD_REQUEST, forgotPasswordRequest),
    takeEvery(AUTH_TYPES.RESET_PASSWORD_REQUEST, resetPasswordRequest),
    takeEvery(
      AUTH_TYPES.RESET_PASSWORD_TOKEN_VERIFY_REQUEST,
      resetPasswordTokenVerifyRequest
    )
  ])
}

export default AuthWatcherSaga
