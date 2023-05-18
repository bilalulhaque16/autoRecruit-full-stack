import * as getApplicationActions from "@src/store/common/jobs/actions"

import { CardBody, Col, Row, Spinner } from "reactstrap"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import AppliedJob from "@src/components/JobApplication"
import ReactPaginate from "react-paginate"
import Select from "react-select"
import { isNullObject } from "./../utility/Utils"
import { selectThemeColors } from "@utils"

const Applications = () => {
  const dispatch = useDispatch()

  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(0)

  const appliedJobs = useSelector((state) => state.jobsReducer.appliedJobs)

  const loading = useSelector((state) => state.jobsReducer.loading)

  useEffect(() => {
    if (isNullObject(appliedJobs)) {
      dispatch(getApplicationActions.getAllAppliedJobsRequest())
    }
  }, [dispatch])

  const handlePagination = (page) => {
    dispatch(
      getApplicationActions.getAllAppliedJobsRequest({
        page: page.selected + 1,
        perPage: rowsPerPage
      })
    )
    setCurrentPage(page.selected)
  }

  const handlePerPage = (e) => {
    dispatch(
      getApplicationActions.getAllAppliedJobsRequest({
        perPage: e.value,
        page: 1
      })
    )
    setCurrentPage(0)
    setRowsPerPage(parseInt(e.value))
  }

  const rowsItemsOptions = [
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 20, label: "20" },
    { value: 50, label: "50" }
  ]

  return (
    <Fragment>
      <Row
        className="d-flex align-items-top justify-content-center mb-2 mb-md-0"
        xs="12"
      >
        <Col md="12" lg="12" sm="12">
          {!isNullObject(appliedJobs) ? (
            appliedJobs.docs.map((job) => (
              <AppliedJob key={job._id} job={job} />
            ))
          ) : (
            <div className="text-center mt-2">
              {loading ? <Spinner /> : <h4>No Applications Found</h4>}
            </div>
          )}
        </Col>
        {isNullObject(appliedJobs) ? null : (
          <Row>
            <Col lg="2" md="3" sm="1">
              <div className="ps-2 pb-2 d-flex align-items-center">
                <Select
                  menuPlacement="top"
                  theme={selectThemeColors}
                  type="select"
                  className="react-select"
                  classNamePrefix="select"
                  id="sort-select"
                  options={rowsItemsOptions}
                  isClearable={false}
                  placeholder="show"
                  defaultValue={`{ value: ${rowsPerPage}}, label: ${rowsPerPage} }`}
                  onChange={handlePerPage}
                />
              </div>
            </Col>
            <Col lg="8" md="3" sm="0"></Col>
            <Col lg="2" md="4" sm="2">
              <CardBody>
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
                  pageCount={appliedJobs.totalPages}
                  onPageChange={(page) => handlePagination(page)}
                  containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
                />
              </CardBody>
            </Col>
          </Row>
        )}
      </Row>
    </Fragment>
  )
}

export default Applications
