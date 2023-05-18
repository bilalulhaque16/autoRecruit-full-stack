import { DefaultRouteForCompany, DefaultRouteForUser } from "../router/routes"
import {
  SideMenuItemsForCompany,
  SideMenuItemsForUser
} from "@src/navigation/menuItems"

import jwt from "jsonwebtoken"

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0

export const isNullObject = (obj) => {
  return (
    obj === null || typeof obj === "undefined" || Object.keys(obj).length === 0
  )
}
// ** Returns K format from a number
export const kFormatter = (num) => {
  return num > 999 ? `${(num / 1000).toFixed(1)}k` : num
}

export const fieldExists = (obj, field) => {
  return isNullObject(obj)
    ? false
    : obj.hasOwnProperty(field) && obj[field] !== undefined
}

export const FirstLetterCapitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// ** Capitalizes first letter of each word
export const capitalizeEachWord = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, "")

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

// format date to July 4, 2023 format
export const formatDateToShow = (date) => {
  if (date) {
    const d = new Date(date)
    const month = d.toLocaleString("default", { month: "short" })
    const day = d.getDate()
    const year = d.getFullYear()
    return `${month} ${day}, ${year}`
  }
  return ""
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { month: "short", day: "numeric", year: "numeric" }
) => {
  if (!value) return value
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value))
}

export const formatDatetoISO = (date) => {
  if (date) {
    const d = new Date(date)
    const month = d.toLocaleString("default", { month: "short" })
    const day = d.getDate()
    const year = d.getFullYear()
    return `${year}-${month}-${day}`
  }
  return ""
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: "short", day: "numeric" }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" }
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem("userData")
export const getUserData = () =>
  JSON.parse(localStorage.getItem("userData") || null)
export const getUserRole = () => {
  if (
    fieldExists(getUserData(), "accessToken") &&
    !isNullObject(getUserData().accessToken)
  ) {
    return jwt.decode(getUserData().accessToken).role
  }
  return null
}

export const getDatafromToken = () => {
  if (
    fieldExists(getUserData(), "accessToken") &&
    !isNullObject(getUserData().accessToken)
  ) {
    return jwt.decode(getUserData().accessToken)
  }
  return null
}

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
// export const getHomeRouteForLoggedInUser = (userRole) => {
//   if (userRole === "admin") return DefaultRoute
//   if (userRole === "user") return "/access-control"
//   return "/login"
// }

export const getHomeRouteForLoggedInUser = () => {
  if (getUserRole() === "admin") return DefaultRouteForCompany
  if (getUserRole() === "user") return DefaultRouteForUser
  return "/login"
}

export const getSideMenuItems = () => {
  if (getUserRole() === "admin") return SideMenuItemsForCompany
  else if (getUserRole() === "user") return SideMenuItemsForUser
  return []
}

// get seeker_profile_id from token payload data (if exists) else return null value (if not exists)
export const getSeekerProfileId = () => {
  if (
    fieldExists(getUserData(), "accessToken") &&
    !isNullObject(getUserData().accessToken) &&
    jwt.decode(getUserData().accessToken).seeker_profile_id
  ) {
    return jwt.decode(getUserData().accessToken).seeker_profile_id
  } else if (localStorage.getItem("seeker_profile_id")) {
    return localStorage.getItem("seeker_profile_id")
  }
  return null
}

// get company_profile_id from token payload data (if exists) else return null value (if not exists)
export const getCompanyProfileId = () => {
  if (
    fieldExists(getUserData(), "accessToken") &&
    !isNullObject(getUserData().accessToken) &&
    jwt.decode(getUserData().accessToken).id
  ) {
    return jwt.decode(getUserData().accessToken).id
  } else {
    return null
  }
}

export const createSeekerProfileId = (seekerProfileId) => {
  const seeker_profile_id = localStorage.getItem("seeker_profile_id")
  if (!seeker_profile_id) {
    localStorage.setItem("seeker_profile_id", seekerProfileId)
  }
}

// ** Get Job Categories from local storage
export const getJobCategories = () => {
  const jobCategories = localStorage.getItem("job_categories")
  return !isNullObject(jobCategories) ? JSON.parse(jobCategories) : []
}

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#7367f01a", // for option hover bg-color
    primary: "#7367f0", // for selected option bg-color
    neutral10: "#7367f0", // for tags bg-color
    neutral20: "#ededed", // for input border-color
    neutral30: "#ededed" // for input hover border-color
  }
})
