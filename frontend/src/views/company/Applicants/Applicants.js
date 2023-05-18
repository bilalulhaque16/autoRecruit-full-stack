// ** React Imports

import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"

import * as appliedJobActions from "@src/store/common/jobs/actions"
import { columns } from "./columns"

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Row,
  UncontrolledDropdown
} from "reactstrap"
import {
  ChevronDown,
  Copy,
  Edit,
  FileText,
  Grid,
  Printer,
  Share,
  Table,
  User,
  UserCheck,
  UserPlus,
  UserX
} from "react-feather"
import { Fragment, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  fieldExists,
  formatDateToShow,
  isNullObject,
  isObjEmpty
} from "@src/utility/Utils"
import { useDispatch, useSelector } from "react-redux"

import Breadcrumbs from "@components/breadcrumbs"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import Select from "react-select"
import jwt from "@src/auth/jwt/useJwt"
import { selectThemeColors } from "@utils"
import StatsHorizontal from "@src/@core/components/widgets/stats/StatsHorizontal"

const Applicants = () => {
  const dispatch = useDispatch()

  const appliedJobs = useSelector((state) => state.jobsReducer.appliedJobs)

  useEffect(() => {
    if (isObjEmpty(!isNullObject(appliedJobs))) {
      dispatch(appliedJobActions.getAllAppliedJobsRequest())
    }
  }, [dispatch])

  const [data, setData] = useState([])

  const JobTitleOptions = [
    { value: "JAVA developer", label: "Java Developer" },
    { value: ".net developer", label: ".NET Developer" },
    { value: "CSharp developer", label: "C# Developer" },
    { value: "react developer", label: "React Developer" }
  ]

  // ** States
  const [searchName, setSearchName] = useState("") // name
  const [searchEmail, setSearchEmail] = useState("") // job title
  const [filteredData, setFilteredData] = useState([])
  const [searchJobTitle, setSearchJobTitle] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Select Role"
  })
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "Select Plan"
  })
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0
  })
  const [searchTerm, setSearchTerm] = useState("")

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    dispatch(
      appliedJobActions.getAllAppliedJobsRequest({
        page: page.selected + 1,
        perPage: rowsPerPage
      })
    )
    setCurrentPage(page.selected)
  }

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: currentRole.value,
      currentPlan: currentPlan.value,
      status: currentStatus.value,
      q: searchTerm
    }
    console.log("data", data, data.length)
    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (data.length > 0) {
      return data
    } else if (data.length === 0 && isFiltered) {
      return []
    } else {
      return data //.slice(0, rowsPerPage)
    }
  }

  useEffect(() => {
    if (fieldExists(appliedJobs, "docs") && appliedJobs.docs.length > 0) {
      const rec = appliedJobs.docs.map((item, index) => {
        const full_name =
          item?.seeker_profile_id?.personal_info?.first_name +
          (item?.seeker_profile_id?.personal_info?.middle_name
            ? " " + item?.seeker_profile_id?.personal_info?.middle_name
            : "") +
          " " +
          item?.seeker_profile_id?.personal_info.last_name
        console.log("item,", item)
        return {
          id: index + 1,
          full_name,
          email: item?.seeker_profile_id?.personal_info?.email,
          job_title: item.job_post_id.job_title,
          apply_date: item.apply_date ? formatDateToShow(item.apply_date) : "",
          current_status: (
            <Badge pill color="light-primary" className="me-1">
              {item.job_application_status}
            </Badge>
          ),
          _id: item._id
          // action: (

          // )
        }
      })

      setData(rec)
    }

    if (!isNullObject(appliedJobs)) {
      setCurrentPage(appliedJobs.page - 1)
    }
  }, [appliedJobs])

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      nextLabel=""
      breakLabel="..."
      previousLabel=""
      pageRangeDisplayed={2}
      forcePage={currentPage}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      pageCount={appliedJobs?.totalPages ? appliedJobs.totalPages : 1}
      onPageChange={(page) => handlePagination(page)}
      containerClassName="pagination react-paginate justify-content-end my-2 pe-1"
    />
  )

  // ** Function to handle name filter
  const handleNameFilter = (e) => {
    const value = e.target.value
    let updatedData = []
    const dataToFilter = () => {
      if (searchJobTitle.length) {
        return data.filter((item) => {
          return item.job_title === searchJobTitle
        })
      } else {
        return data
      }
    }

    setSearchName(value)
    if (value.length) {
      updatedData = dataToFilter().filter((item) => {
        const startsWith = item.full_name
          .toLowerCase()
          .startsWith(value.toLowerCase())

        const includes = item.full_name
          .toLowerCase()
          .includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData([...updatedData])
      setSearchName(value)
    }
  }

  //** Function to handle Job Title filter using select
  const handleJobTitleFilter = (e) => {
    // clear previous filter for job title

    const value = e.value
    let updatedData = []
    const dataToFilter = () => {
      if (searchName.length) {
        return filteredData
      } else {
        return data
      }
    }

    console.log("value", value)

    setSearchJobTitle(value)
    if (value.length) {
      updatedData = dataToFilter().filter((item) => {
        if (item.job_title === value) {
          return item.job_title === value
        } else return null
      })

      setFilteredData([...updatedData])
      setSearchJobTitle(value)
    }
  }
  
  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getData({
        sort,
        sortColumn,
        q: "searchTerm",
        perPage: value,
        page: currentPage,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value
      })
    )
    setRowsPerPage(value)
  }
  // ** Table Header
  const CustomHeader = ({
    store,
    // toggleSidebar,
    handlePerPage,
    rowsPerPage,
    handleFilter,
    searchTerm
  }) => {
    // ** Converts table to CSV
    function convertArrayOfObjectsToCSV(array) {
      let result

      const columnDelimiter = ","
      const lineDelimiter = "\n"
      const keys = Object.keys(dataToRender())

      result = ""
      result += keys.join(columnDelimiter)
      result += lineDelimiter

      array.forEach((item) => {
        let ctr = 0
        keys.forEach((key) => {
          if (ctr > 0) result += columnDelimiter

          result += item[key]

          ctr++
        })
        result += lineDelimiter
      })

      return result
    }

    // ** Downloads CSV
    function downloadCSV(array) {
      const link = document.createElement("a")
      let csv = convertArrayOfObjectsToCSV(array)
      if (csv === null) return

      const filename = "export.csv"

      if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`
      }

      link.setAttribute("href", encodeURI(csv))
      link.setAttribute("download", filename)
      link.click()
    }

    return (
      <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
        <Row>
          <Col xl="6" className="d-flex align-items-center p-0">
            <div className="d-flex align-items-center w-100">
              <label htmlFor="rows-per-page">Show</label>
              <Input
                className="mx-50"
                type="select"
                id="rows-per-page"
                // value={rowsPerPage}
                // onChange={handlePerPage}
                style={{ width: "5rem" }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Input>
              <label htmlFor="rows-per-page">Entries</label>
            </div>
          </Col>
          <Col
            xl="6"
            className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
          >
            <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
              <label className="mb-0" htmlFor="search-invoice">
                Search:
              </label>
              <Input
                id="search-invoice"
                className="ms-50 w-100"
                type="text"
                // value={searchTerm}
                // onChange={(e) => handleFilter(e.target.value)}
              />
            </div>

            <div className="d-flex align-items-center table-header-actions">
              <UncontrolledDropdown className="me-1">
                <DropdownToggle color="secondary" caret outline>
                  <Share className="font-small-4 me-50" />
                  <span className="align-middle">Export</span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className="w-100">
                    <Printer className="font-small-4 me-50" />
                    <span className="align-middle">Print</span>
                  </DropdownItem>
                  <DropdownItem
                    className="w-100"
                    // onClick={() => downloadCSV(store.data)}
                  >
                    <FileText className="font-small-4 me-50" />
                    <span className="align-middle">CSV</span>
                  </DropdownItem>
                  <DropdownItem className="w-100">
                    <Grid className="font-small-4 me-50" />
                    <span className="align-middle">Excel</span>
                  </DropdownItem>
                  <DropdownItem className="w-100">
                    {/* <File className="font-small-4 me-50" /> */}
                    <span className="align-middle">PDF</span>
                  </DropdownItem>
                  <DropdownItem className="w-100">
                    <Copy className="font-small-4 me-50" />
                    <span className="align-middle">Copy</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <Button
                className="add-new-user"
                color="primary"
                // onClick={toggleSidebar}
              >
                Add New User
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <Fragment>
      {/* {CardSelected ? ( */}
      <div className="app-user-list">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="Total Users"
              icon={<User size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">21,459</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="Paid Users"
              icon={<UserPlus size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">4,567</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="Active Users"
              icon={<UserCheck size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">19,860</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="Pending Users"
              icon={<UserX size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">237</h3>}
            />
          </Col>
        </Row>
        {/* <Table /> */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">Name</Label>
              <Input
                id="name"
                placeholder="Search by name"
                value={searchName}
                onChange={handleNameFilter}
              />
            </Col>
            <Col className="my-md-0 my-1" md="4">
              <Label for="plan-select">Plan</Label>
              <Select
                // theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                // options={planOptions}
                // value={currentPlan}
                onChange={(data) => {
                  // setCurrentPlan(data)
                  // dispatch(
                  //   getData({
                  //     sort,
                  //     sortColumn,
                  //     q: searchTerm,
                  //     page: currentPage,
                  //     perPage: rowsPerPage,
                  //     role: currentRole.value,
                  //     currentPlan: data.value,
                  //     status: currentStatus.value
                  //   })
                  // )
                }}
              />
            </Col>
            <Col md="4">
              <Label for="status-select">Status</Label>
              <Select
                placeholder="Select Job Title"
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={JobTitleOptions}
                isClearable={false}
                // value={values}
                value={JobTitleOptions.find(
                  (obj) => obj.value === searchJobTitle
                )}
                onChange={(e) => {
                  handleJobTitleFilter(e)
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns()}
            // onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                store={dataToRender()}
                // searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                // handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                // toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default Applicants
