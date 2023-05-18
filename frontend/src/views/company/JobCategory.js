// ** React Imports

import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"

import * as jobCategoryActions from "@src/store/common/jobcategory/actions"

import { Button, Card, Col, Input, Label, Row } from "reactstrap"
import { ChevronDown, Edit, Plus, Trash } from "react-feather"
import { Fragment, useEffect, useState } from "react"
import {
  fieldExists,
  formatDateToShow,
  isNullObject,
  isObjEmpty
} from "@src/utility/Utils"
import { useDispatch, useSelector } from "react-redux"

import AddJobCategoryForm from "@src/components/AddJobCategoryForm"
import Breadcrumbs from "@components/breadcrumbs"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import Select from "react-select"
import Swal from "sweetalert2"
import { selectThemeColors } from "@utils"
import withReactContent from "sweetalert2-react-content"

// ** Styles

// import TableAdvSearch from './TableAdvSearch'

// ** Table Columns
// import { datajobcategories, Addjobcategories } from "./data"

// ** Third Party Components

// ** Reactstrap Imports

// ** Styles

// ** Third Party Components

const MySwal = withReactContent(Swal)

const JobCategory = () => {
  // ** States
  // const [Picker, setPicker] = useState("")
  // const [searchName, setSearchName] = useState("")
  // const [searchPost, setSearchPost] = useState("")
  // const [searchCity, setSearchCity] = useState("")
  // const [searchEmail, setSearchEmail] = useState("")
  // const [searchSalary, setSearchSalary] = useState("")
  // const [filteredData, setFilteredData] = useState([])
  const [searchValue, setSearchValue] = useState("")

  const [rowsPerPage, setRowsPerPage] = useState()
  const [currentPage, setCurrentPage] = useState(0)
  const [data, setData] = useState([])

  const [sendSidebarOpen, setSendSidebarOpen] = useState({
    open: false,
    data: {},
    formType: ""
  })
  // !sendSidebarOpen.open

  const toggleSendSidebar = () =>
    setSendSidebarOpen({
      open: !sendSidebarOpen.open,
      data: {},
      formType: ""
    })

  const dispatch = useDispatch()

  const jobCategories = useSelector(
    (state) => state.jobCategoryReducer.jobCategories
  )

  const handleConfirmCancel = (data) => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1"
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        dispatch(
          jobCategoryActions.deleteJobCategoryRequest({
            params: data._id
          })
        )

        // for rerendering the table
        dispatch(jobCategoryActions.getAllJobCategoriesRequest())

        MySwal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your file has been deleted.",
          customClass: {
            confirmButton: "btn btn-success"
          }
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success"
          }
        })
      }
    })
  }

  const ColumnsHeader = [
    {
      name: "ID",
      sortable: true,
      minWidth: "200px",
      selector: (row) => row.id
    },
    {
      name: "CATEGORY NAME",
      sortable: true,
      minWidth: "250px",
      selector: (row) => row.name
    },
    {
      name: "CREATED DATE",
      sortable: true,
      minWidth: "250px",
      selector: (row) => formatDateToShow(row.date_created)

      //  row.date_created
    },
    {
      name: "ACTIONS",

      cell: (row) => {
        return (
          <div className="d-flex justify-content-center">
            <Button
              size="sm"
              color="primary"
              outline
              className="btn btn-icon me-1"
              onClick={() => {
                setSendSidebarOpen({
                  open: true,
                  data: row,
                  formType: "edit"
                })
              }}
              // onClick={() => handleEditClick(row)}
            >
              <Edit className="font-medium-2" />
              <span className="align-middle ms-50">Edit</span>
            </Button>
            <Button
              size="sm"
              color="danger"
              outline
              className="btn btn-icon"
              onClick={() => {
                handleConfirmCancel(row)
              }}

              // onClick={() => dispatch(deletePermission(row.id))}
            >
              <Trash className="font-medium-2" />
              <span className="align-middle ms-50">Delete</span>
            </Button>
          </div>
        )
      }
    }
  ]

  const rowsItemsOptions = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "20" },
    { value: 50, label: "50" }
  ]

  useEffect(() => {
    if (isObjEmpty(!isNullObject(jobCategories))) {
      dispatch(jobCategoryActions.getAllJobCategoriesRequest())
    }
  }, [dispatch])

  useEffect(() => {
    if (fieldExists(jobCategories, "docs") && jobCategories.docs.length > 0) {
      const a = jobCategories.docs.map((item, index) => {
        return {
          id: index + 1,
          name: item.name,
          date_created: item.date_created,
          _id: item._id
        }
      })
      setData(a)
    }
    if (!isNullObject(jobCategories)) {
      setCurrentPage(jobCategories.page - 1)
    }
  }, [jobCategories])

  // ** Table data to render
  const dataToRender = () => {
    if (
      false
      // searchName.length ||
      // searchPost.length ||
      // searchEmail.length ||
      // searchCity.length ||
      // searchSalary.length ||
      // Picker.length
    ) {
      return filteredData
    } else {
      return data
    }
  }

  // ** Function to handle name filter
  // const handleNameFilter = (e) => {
  //   const value = e.target.value
  //   let updatedData = []
  //   const dataToFilter = () => {
  //     if (
  //       searchEmail.length ||
  //       searchPost.length ||
  //       searchCity.length ||
  //       searchSalary.length ||
  //       Picker.length
  //     ) {
  //       return filteredData
  //     } else {
  //       return data
  //     }
  //   }

  //   setSearchName(value)
  //   if (value.length) {
  //     updatedData = dataToFilter().filter((item) => {
  //       const startsWith = item.full_name
  //         .toLowerCase()
  //         .startsWith(value.toLowerCase())

  //       const includes = item.full_name
  //         .toLowerCase()
  //         .includes(value.toLowerCase())

  //       if (startsWith) {
  //         return startsWith
  //       } else if (!startsWith && includes) {
  //         return includes
  //       } else return null
  //     })
  //     setFilteredData([...updatedData])
  //     setSearchName(value)
  //   }
  // }

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    dispatch(
      jobCategoryActions.getAllJobCategoriesRequest({
        page: page.selected + 1,
        perPage: rowsPerPage
      })
    )
    setCurrentPage(page.selected)
  }

  // ** Function to handle per page
  const handlePerPage = (e) => {
    dispatch(
      jobCategoryActions.getAllJobCategoriesRequest({
        perPage: e.value,
        page: 1
      })
    )
    setCurrentPage(0)
    setRowsPerPage(parseInt(e.value))
  }

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
      pageCount={
        // searchValue.length
        //   ? Math.ceil(filteredData.length / 7)
        //   : Math.ceil(data.length / 7) ||
        // Math.ceil(jobCategories.total / rowsPerPage)
        jobCategories.totalPages
      }
      onPageChange={(page) => handlePagination(page)}
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  )

  return (
    <Fragment>
      <Card>
        <Row>
          <Col sm="12">
            <div className="d-flex justify-content-end mt-2 me-2">
              <Button
                className="ms-2"
                color="primary"
                onClick={() => {
                  setSendSidebarOpen({
                    open: true,
                    data: "",
                    formType: "add"
                  })
                }}
              >
                <Plus size={15} />
                <span className="align-middle ms-50">Add Record</span>
              </Button>
            </div>
            <div className="react-dataTable">
              <DataTable
                noHeader
                columns={ColumnsHeader}
                paginationPerPage={rowsPerPage}
                className="react-dataTable"
                sortIcon={<ChevronDown size={10} />}
                paginationDefaultPage={currentPage + 1}
                // paginationComponent={CustomPagination}
                data={dataToRender()}
              />
            </div>
            <CustomPagination />
          </Col>
          <Col lg="2" md="3" sm="1">
            <div className="ps-2 pb-2 d-flex align-items-center">
              <Select
                menuPlacement="top"
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                type="select"
                id="sort-select"
                options={rowsItemsOptions}
                isClearable={false}
                placeholder="show"
                defaultValue={`{ value: ${rowsPerPage}}, label: ${rowsPerPage} }`}
                onChange={handlePerPage}
              />
            </div>
          </Col>
        </Row>
      </Card>
      <AddJobCategoryForm
        toggleSidebar={toggleSendSidebar}
        open={sendSidebarOpen.open}
        formType={sendSidebarOpen.formType}
        data={sendSidebarOpen.data}
      />
    </Fragment>
  )
}
export default JobCategory
