// ** Reactstrap Imports
import { Card, CardBody, Button } from "reactstrap"

// ** Third Party Components
import toast from "react-hot-toast"
import { Clock } from "react-feather"

const ToastPromise = ({ loginPromise }) => {
  return toast.promise(loginPromise, {
    loading: "Loading",
    success: "Got the data",
    error: "Error when fetching"
  })
}

export default ToastPromise
