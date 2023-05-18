import { AUTH_TYPES } from "./types"

// ** UseJWT import to get config
import useJwt from "@src/auth/jwt/useJwt"

const config = useJwt.jwtConfig

const initialState = {
  loading: false,
  response: null,
  error: null
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_TYPES.VERIFY_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
        response: null,
        error: null
      }

    case AUTH_TYPES.VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
        error: null
      }

    case AUTH_TYPES.VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        response: null,
        error: action.payload
      }

    case AUTH_TYPES.CLEAR_VERIFY_EMAIL:
      return {
        ...state,
        loading: false,
        response: null,
        error: null
      }

    case AUTH_TYPES.RESEND_OTP_REQUEST:
      return {
        ...state,
        loading: true,
        response: null,
        error: null
      }

    case AUTH_TYPES.RESEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
        error: null
      }

    case AUTH_TYPES.RESEND_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        response: null,
        error: action.payload
      }

    case AUTH_TYPES.CLEAR_RESEND_OTP:
      return {
        ...state,
        loading: false,
        response: null,
        error: null
      }

    case AUTH_TYPES.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        response: null,
        error: null
      }

    case AUTH_TYPES.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
        error: null
      }

    case AUTH_TYPES.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        response: null,
        error: action.payload
      }

    case AUTH_TYPES.CLEAR_FORGOT_PASSWORD:
      return {
        ...state,
        loading: false,
        response: null,
        error: null
      }

    case AUTH_TYPES.RESET_PASSWORD_TOKEN_VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
        response: null,
        error: null
      }

    case AUTH_TYPES.RESET_PASSWORD_TOKEN_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
        error: null
      }

    case AUTH_TYPES.RESET_PASSWORD_TOKEN_VERIFY_FAILURE:
      return {
        ...state,
        loading: false,
        response: null,
        error: action.payload
      }

    case AUTH_TYPES.CLEAR_RESET_PASSWORD_TOKEN_VERIFY:
      return {
        ...state,
        loading: false,
        response: null,
        error: null
      }

    case AUTH_TYPES.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        response: null,
        error: null
      }

    case AUTH_TYPES.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
        error: null
      }

    case AUTH_TYPES.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        response: null,
        error: action.payload
      }

    case AUTH_TYPES.CLEAR_RESET_PASSWORD:
      return {
        ...state,
        loading: false,
        response: null,
        error: null
      }

    default:
      return state
  }
}
