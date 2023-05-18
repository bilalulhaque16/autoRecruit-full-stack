// ** React Imports
import { Fragment, lazy } from "react"
import {
  getHomeRouteForLoggedInUser,
  getUserData,
  getUserRole
} from "@src/utility/Utils"
// ** Utils
import { isNullObject, isObjEmpty } from "@utils"

// ** Layouts
import BlankLayout from "@layouts/BlankLayout"
import HorizontalLayout from "@src/layouts/HorizontalLayout"
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper"
import { Navigate } from "react-router-dom"
import RoleBasedRoute from "@components/routes/RoleBasedRoute"
import VerticalLayout from "@src/layouts/VerticalLayout"

// ** Route Components
//import PublicRoute from "@components/routes/PublicRoute"

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Document title
const TemplateTitle = "%s - AutoRecruit Portal React Admin Template"

// ** Default Route
const DefaultRouteForUser = "/home"
const DefaultRouteForCompany = "/dashboard"

const Home = lazy(() => import("../../views/Home"))
const Login = lazy(() => import("../../views/Login"))
const Register = lazy(() => import("../../views/Register"))
const ForgotPassword = lazy(() => import("../../views/ForgotPassword"))
const Error = lazy(() => import("../../views/Error"))
const Applications = lazy(() => import("../../views/Applications"))
const ApplicationDetails = lazy(() => import("../../views/ApplicationDetails"))
const VerifyEmail = lazy(() => import("../../views/VerifyEmail"))
const Profile = lazy(() => import("../../views/Profile"))
const ResetPassword = lazy(() => import("./../../views/ResetPassword"))
const Information = lazy(() => import("./../../views/Information"))
const Dashboard = lazy(() => import("./../../views/company/Dashboard"))
const NotAuthorized = lazy(() => import("./../../views/NotAuthorized"))
const Applicants = lazy(() => import("../../views/company/Applicants/Applicants"))
const ApplicantDetails = lazy(() =>
  import("./../../views/company/ApplicantDetails")
)

const JobPost = lazy(() => import("../../views/company/createJob/JobPost"))
const CompanyProfile = lazy(() =>
  import("./../../views/company/CompanyProfile")
)
const JobCategory = lazy(() => import("./../../views/company/JobCategory"))

const PostedJobs = lazy(() => import("./../../views/company/PostedJobs"))

function getHomeRoute() {
  const user = getUserData()
  if (user) {
    return getHomeRouteForLoggedInUser(user.role)
  } else {
    return "/login"
  }
}

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={getHomeRoute()} />,
    meta: {
      layout: "blank",
      type: "public"
    }
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
    meta: {
      layout: "blank",
      meta: {
        type: "public"
      }
    }
  },
  {
    path: "/home",
    element: <Home />,
    meta: {
      role: "user",
      type: "protected"
    }
  },

  {
    path: "/applications",
    element: <Applications />,
    meta: {
      role: "user",
      type: "protected"
    }
  },
  {
    path: "/applications/:id",
    element: <ApplicationDetails />,
    meta: {
      role: "user",
      type: "protected"
    }
  },
  {
    path: "/profile",
    element: <Profile />,
    meta: {
      role: "user",
      type: "protected"
    }
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
      type: "public"
    }
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
      type: "public"
    }
  },
  {
    // add params to the path
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
      type: "public"
    }
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
    meta: {
      layout: "blank",
      type: "public"
    }
  },
  {
    path: "/information",
    element: <Information />,
    meta: {
      type: "protected",
      role: "user"
    }
  },
  {
    path: "*",
    element: <Error />,
    children: [{ path: "*", element: <Error /> }],
    meta: {
      layout: "blank",
      type: "public"
    }
  },
  {
    path: "/auth/not-auth",
    element: <BlankLayout />,
    children: [{ path: "/auth/not-auth", element: <NotAuthorized /> }],
    meta: {
      layout: "blank",
      type: "public"
    }
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    meta: {
      type: "protected",
      role: "admin"
    }
  },
  {
    path: "/applicants",

    element: <Applicants />,
    meta: {
      type: "protected",
      role: "admin"
    }
  },
  {
    path: "/applicant-details/:id",
    element: <ApplicantDetails />,
    meta: {
      type: "protected",
      role: "admin"
    }
  },
  {
    path: "/create-job",
    element: <JobPost />,
    meta: {
      type: "protected",
      role: "admin"
    }
  },
  {
    path: "/company-profile",
    element: <CompanyProfile />,
    meta: {
      type: "protected",
      role: "admin"
    }
  },
  {
    path: "/job-category",
    element: <JobCategory />,
    meta: {
      type: "protected",
      role: "admin"
    }
  },
  {
    path: "/posted-jobs",
    element: <PostedJobs />,
    meta: {
      type: "protected",
      role: "admin"
    }
  }

]

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = RoleBasedRoute
        // const RouteTag = PublicRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false)
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical"
  const layouts = ["vertical", "horizontal", "blank"]

  const AllRoutes = []

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

// Modify these code like that only that logged in user can access the protected routes and user based on role can access the routes assigned to him otherwise Navigate to Not Authorized page , meanwhile if user is not logged in then Navigate to Login page and public routes are open

export {
  DefaultRouteForUser,
  DefaultRouteForCompany,
  TemplateTitle,
  Routes,
  getRoutes
}

// write an function which add two numbers  and return the result
