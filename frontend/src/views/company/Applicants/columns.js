// ** React Imports
import { Link, useNavigate } from "react-router-dom"
import * as appliedJobActions from "@src/store/common/jobs/actions"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Store & Actions
// import { store } from '@store/store'
// import { getUser, deleteUser } from '../store'

// ** Icons Imports
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive
} from "react-feather"

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap"
import { useDispatch } from "react-redux"

export const columns = () => {


  const dispatch = useDispatch()
  const Navigate = useNavigate()

  // ** Renders Client Columns
const renderClient = row => {
  if (row.hasOwnProperty("avatar") && row.avatar.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={row.avatarColor || 'light-primary'}
        content={row.full_name || 'John Doe'}
      />
    )
  }
}

  return [
    // {
    //   name: "SNo.",
    //   sortable: true,
    //   maxWidth: "40px",
    //   selector: (row) => row.id
    // },

    {
      name: "Applicants",
      sortable: true,
      minWidth: "300px",
      sortField: "full_name",
      selector: (row) => row.full_name,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <Link
              to={`/apps/user/view/${row.id}`}
              className="user_name text-truncate text-body"
              // onClick={() => store.dispatch(getUser(row.id))}
            >
              <span className="fw-bolder">{row.full_name}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">{row.email}</small>
          </div>
        </div>
      )
    },

    {
      name: "Job Title",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.job_title
    },
    {
      name: "Applied Date / Time ",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.apply_date
    },

    {
      name: "Current Status",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.current_status
    },
    {
      name: "Actions",
      minWidth: "100px",
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag={Link}
                className="w-100"
                to={`/applicant-details/${row.id}`}
                onClick={() => {
                  
                  localStorage.setItem("jobId", row._id)

                  dispatch(
                    appliedJobActions.getSpecificAppliedJobRequest({
                      params: row._id
                    })
                  )
                  
                  // Navigate(`/applicant-details/${row._id}`)
                }}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle">Details</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => e.preventDefault()}
              >
                <Archive size={14} className="me-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault()
                  // store.dispatch(deleteUser(row.id))
                }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ]
}
