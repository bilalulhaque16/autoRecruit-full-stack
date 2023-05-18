import * as jobActions from "@src/store/common/jobs/actions"
// ** Store & Actions
import * as loginActions from "@src/store/common/login/actions"

// ** Third Party Components
import {
  CheckSquare,
  CreditCard,
  HelpCircle,
  Mail,
  MessageSquare,
  Power,
  Settings,
  User
} from "react-feather"
// ** Reactstrap Imports
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap"
// ** React Imports
import { Link, useNavigate } from "react-router-dom"
import {
  getDatafromToken,
  getSeekerProfileId,
  getUserRole
} from "@src/utility/Utils"
import { useDispatch, useSelector } from "react-redux"

// ** Custom Components
import Avatar from "@components/avatar"
import MySwal from "sweetalert2"
// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/no_img.jpg"

const UserDropdown = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //const UserData = useSelector((state) => state.loginReducer.userData)

  const handleLogout = () => {
    dispatch(loginActions.logout())
    // clear redux store
    dispatch(jobActions.resetGetAllJobs())
    //dispatch(loginActions.clearLogin())
  }

  const handleNoProfileExist = () => {
    return MySwal.fire({
      title: "You have no profile yet! ",
      text: "Do you want to create one?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline ms-1"
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        navigate("/information")
      } else {
        console.log("no profile")
      }
    })
  }

  // role based profile navigation
  const handleProfile = () => {
    if (getUserRole() === "admin") {
      navigate("/company-profile")
    } else if (getUserRole() === "user") {
      // check if seeker_profile_id exists in token payload data (if exists) else navigate to profile page (if not exists)
      getSeekerProfileId() ? navigate("/profile") : handleNoProfileExist()
    } else {
      navigate("/dashboard")
    }
  }

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">{getDatafromToken()?.email}</span>
          {/*<span className="user-status">{}</span>*/}
        </div>
        <Avatar
          img={defaultAvatar}
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem
          // tag={Link}
          // to="/profile"
          onClick={handleProfile}
        >
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        {/*
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <Mail size={14} className="me-75" />
          <span className="align-middle">Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <CheckSquare size={14} className="me-75" />
          <span className="align-middle">Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <MessageSquare size={14} className="me-75" />
          <span className="align-middle">Chats</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem
          tag={Link}
          to="/pages/"
          onClick={(e) => e.preventDefault()}
        >
          <Settings size={14} className="me-75" />
          <span className="align-middle">Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <CreditCard size={14} className="me-75" />
          <span className="align-middle">Pricing</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <HelpCircle size={14} className="me-75" />
          <span className="align-middle">FAQ</span>
        </DropdownItem>
        */}
        <DropdownItem tag={Link} to="/login" onClick={handleLogout}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
