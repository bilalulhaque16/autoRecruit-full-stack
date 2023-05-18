import { LOGIN_TYPES } from "./types"
import useJwt from "@src/auth/jwt/useJwt"

// ** UseJWT import to get config

const config = useJwt.jwtConfig

const initialUser = () => {
  const item = localStorage.getItem("userData")
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

const initialState = {
  email: null,
  error: null,
  userData: initialUser(),
  loading: false
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_TYPES.REQUEST:
      return {
        ...state,
        email: action.payload.email,
        loading: true
      }

    case LOGIN_TYPES.SUCCESS:
      state.userData = action.payload
      state[config.storageTokenKeyName] =
        action.payload[config.storageTokenKeyName]
      state[config.storageRefreshTokenKeyName] =
        action.payload[config.storageRefreshTokenKeyName]
      localStorage.setItem("userData", JSON.stringify(action.payload))
      localStorage.setItem(
        config.storageTokenKeyName,
        action.payload.accessToken
      )
      localStorage.setItem(
        config.storageRefreshTokenKeyName,
        JSON.stringify(action.payload.refreshToken)
      )
      localStorage.setItem(
        "job_categories",
        JSON.stringify(
          action.payload?.seeker_profile_credentials?.work_and_experience
            ?.job_categories || []
        )
      )
      state.loading = false
      state.error = null
      return {
        ...state
      }

    case LOGIN_TYPES.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case LOGIN_TYPES.LOGOUT:
      state.userData = {}
      state[config.storageTokenKeyName] = null
      state[config.storageRefreshTokenKeyName] = null
      localStorage.removeItem("userData")
      localStorage.removeItem(config.storageTokenKeyName)
      localStorage.removeItem(config.storageRefreshTokenKeyName)
      localStorage.clear()
      state.loading = false
      state.error = null
      state.email = null
      return {
        ...state
      }

    case LOGIN_TYPES.CLEAR_ERROR:
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
}
