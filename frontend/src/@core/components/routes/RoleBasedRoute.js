// ** React Imports

import { getHomeRouteForLoggedInUser, getUserRole, isNullObject } from "@utils"

import { Navigate } from "react-router-dom"
import { Suspense } from "react"

// ** Utils

// import { isNullObject } from '@src/utility/Utils';

const RoleBasedRoute = ({ children, route }) => {
  if (route) {
    const role = getUserRole()

    if (route.meta.type === "public") {
      // Check if the user is logged in
      if (isNullObject(role)) {
        // If the user is not logged in, navigate to the login page
        return <Suspense fallback={null}>{children}</Suspense>
      } else {
        return <Navigate replace to={getHomeRouteForLoggedInUser(role)} />
      }
    }

    if (route.meta.type === "protected") {
      // Check if the user is logged in
      if (isNullObject(role)) {
        // If the user is not logged in, navigate to the login page
        return <Navigate replace to={"/login"} />
      } else if (role !== route.meta.role) {
        return <Navigate replace to={"/auth/not-auth"} />
      } else {
        return <Suspense fallback={null}>{children}</Suspense>
      }
    }
    return <Suspense fallback={null}>{children}</Suspense>
  }
}

export default RoleBasedRoute
