import * as jobActions from "@src/store/common/jobs/actions"
import * as resumeFormActions from "@src/store/common/resumeform/actions"

import { ArrowLeft, ChevronDown, RotateCw, Star, X } from "react-feather"
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Row,
  Spinner,
  UncontrolledDropdown
} from "reactstrap"
import {
  FirstLetterCapitalize,
  fieldExists,
  getSeekerProfileId,
  isNullObject,
  isObjEmpty
} from "@src/utility/Utils"
import { Fragment, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import CardAction from "@components/card-actions"
import { JobPostCard } from "@src/components/JobPostCard"
import ReactPaginate from "react-paginate"
import Select from "react-select"
import Swal from "sweetalert2"
import { selectThemeColors } from "@utils"
import { toast } from "react-hot-toast"
import { use } from "i18next"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import withReactContent from "sweetalert2-react-content"
import BreadCrumbs from "@src/@core/components/breadcrumbs"

// ** Reactstrap Imports

const MySwal = withReactContent(Swal)

const Home = () => {
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

  const json = {
    _request: {
      Comments: "Ammad Testing",
      Name: "signaturetest",
      DataAreaId: "EXP",
      TruckId: "TR1",
      FileName: "signature.png",
      FileData:
        "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",
      InvoiceNo: "AR003892_SO-Inv",
      axpTruckInvoiceAttachmentItems: [
        {
          Description: "FROM postman---",
          itemId: "0017281",
          RecId: 5637596690
        }
      ]
    }
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const jobs = useSelector((state) => state.jobsReducer.jobs)
  const loading = useSelector((state) => state.jobsReducer.loading)
  const specificJob = useSelector((state) => state.jobsReducer.job)
  const futureNavigation = useSelector(
    (state) => state.resumeFormReducer.futureNavigation
  )

  const apply = useSelector((state) => state.jobsReducer.apply)

  const loadingforSpecificJob = useSelector(
    (state) => state.jobsReducer.loadingforSpecificJob
  )

  const loadingforApply = useSelector(
    (state) => state.jobsReducer.loadingforApply
  )

  const { t } = useTranslation()

  const [CardSelected, setCardSelected] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(0)

  const handleApplyClick = useCallback((id) => {
    dispatch(jobActions.clearSpecificJob())
    dispatch(jobActions.getSpecificJobRequest({ params: id }))
    if (!CardSelected) {
      setCardSelected(true)
    }
  }, [])

  useEffect(() => {
    // if future navigation is present and contains id of job
    if (futureNavigation && futureNavigation.futureNavigation) {
      const { id } = futureNavigation
      setCardSelected(true)
      dispatch(jobActions.getSpecificJobRequest({ params: id }))
    }
  }, [futureNavigation])

  useEffect(() => {
    if (!isNullObject(apply)) {
      if (apply === "You've already applied to this job.") {
        MySwal.fire({
          title: "Error!",
          text: apply,
          icon: "warning",
          showCancelButton: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary"
          },
          buttonsStyling: false
        }).then(function (result) {
          if (result.value) {
            dispatch(jobActions.resetApplyForJob())
          }
        })
      } else if (apply === "Created") {
        MySwal.fire({
          title: "Success!",
          text: "You've successfully applied to this job.",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary"
          },
          buttonsStyling: false
        }).then(function (result) {
          if (result.value) {
            dispatch(jobActions.resetApplyForJob())
          }
        })
      } else {
        toast.error("Error")
        dispatch(jobActions.resetApplyForJob())
      }
    }
  }, [apply])

  const planOptions = [
    { value: "", label: "Select Plan" },
    { value: "basic", label: "Basic" },
    { value: "company", label: "Company" },
    { value: "enterprise", label: "Enterprise" },
    { value: "team", label: "Team" }
  ]

  const rowsItemsOptions = [
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 20, label: "20" },
    { value: 50, label: "50" }
  ]
  // ** User filter options
  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "admin", label: "Admin" },
    { value: "author", label: "Author" },
    { value: "editor", label: "Editor" },
    { value: "maintainer", label: "Maintainer" },
    { value: "subscriber", label: "Subscriber" }
  ]

  useEffect(() => {
    if (isNullObject(jobs)) {
      dispatch(jobActions.getAllJobsRequest())
    }
  }, [dispatch])

  const handleNoProfileExist = () => {
    return MySwal.fire({
      title: "You have no profile resume yet! ",
      text: "Do you want to create one?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline ms-1"
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        dispatch(
          resumeFormActions.setfutureNavigation({
            futureNavigation: "/home",
            id: specificJob._id
          })
        )
        navigate("/information")
      } else {
        console.log("no profile")
      }
    })
  }

  const handlePagination = (page) => {
    dispatch(
      jobActions.getAllJobsRequest({
        page: page.selected + 1,
        perPage: rowsPerPage
      })
    )
    setCurrentPage(page.selected)
  }

  const handlePerPage = (e) => {
    dispatch(
      jobActions.getAllJobsRequest({
        perPage: e.value,
        page: 1
      })
    )
    setCurrentPage(0)
    setRowsPerPage(parseInt(e.value))
  }

  const handleApplyJobButtonClick = () => {
    //getSeekerProfileId() ? navigate("/profile") : handleNoProfileExist()

    if (getSeekerProfileId()) {
      setCardSelected(false)
      dispatch(
        jobActions.applyForJobRequest({
          job_post_id: specificJob._id
        })
      )
    } else {
      handleNoProfileExist()
    }
  }

  return (
    <Fragment>
      <BreadCrumbs title='View All Jobs' data={[]} />
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='4'>
              <Label for='role-select'>Role</Label>
              <Select
                isClearable={false}
                // value={currentRole}
                // options={roleOptions}
                className='react-select'
                classNamePrefix='select'
                // theme={selectThemeColors}
                // onChange={data => {
                //   setCurrentRole(data)
                //   dispatch(
                //     getData({
                //       sort,
                //       sortColumn,
                //       q: searchTerm,
                //       role: data.value,
                //       page: currentPage,
                //       perPage: rowsPerPage,
                //       status: currentStatus.value,
                //       currentPlan: currentPlan.value
                //     })
                //   )
                // }}
              />
            </Col>
            <Col className='my-md-0 my-1' md='4'>
              <Label for='plan-select'>Plan</Label>
              <Select
                // theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                // options={planOptions}
                // value={currentPlan}
                // onChange={data => {
                //   setCurrentPlan(data)
                //   dispatch(
                //     getData({
                //       sort,
                //       sortColumn,
                //       q: searchTerm,
                //       page: currentPage,
                //       perPage: rowsPerPage,
                //       role: currentRole.value,
                //       currentPlan: data.value,
                //       status: currentStatus.value
                //     })
                //   )
                // }}
              />
            </Col>
            <Col md='4'>
              <Label for='status-select'>Status</Label>
              <Select
                // theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                // options={statusOptions}
                // value={currentStatus}
                // onChange={data => {
                //   setCurrentStatus(data)
                //   dispatch(
                //     getData({
                //       sort,
                //       sortColumn,
                //       q: searchTerm,
                //       page: currentPage,
                //       status: data.value,
                //       perPage: rowsPerPage,
                //       role: currentRole.value,
                //       currentPlan: currentPlan.value
                //     })
                //   )
                // }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
        {CardSelected ? (
          <Row>
            <Col>
              {fieldExists(jobs, "docs") && jobs.docs.length > 0
                ? jobs.docs.map((value, index) => (
                    <Col key={index} className="rounded">
                      <JobPostCard
                        jobPost={value}
                        handleApplyClick={handleApplyClick}
                        CardSelected={CardSelected}
                        id={specificJob._id}
                      />
                    </Col>
                  ))
                : null}
            </Col>
            
            <Col md="5" sm="12" lg="7">
              {!isNullObject(specificJob) ? (
                <Card>
                  <CardBody className="pt-2">
                    <Row>
                      <Col
                        lg="7"
                        onClick={() => {
                          setCardSelected(false)
                          dispatch(jobActions.clearSpecificJob())
                        }}
                      >
                        <ArrowLeft />
                      </Col>
                    </Row>
                    <br></br>
                    <CardTitle>{specificJob.job_title}</CardTitle>

                    <CardText></CardText>
                    <CardText>{t("About this Job")}</CardText>
                    <CardText>
                      {t("Job Type")} :{" "}
                      {FirstLetterCapitalize(specificJob.job_type)}
                    </CardText>
                    <CardText>
                      {t("Shift")}:{" "}
                      {FirstLetterCapitalize(specificJob.job_shift)}
                    </CardText>
                    <CardText className="">
                      Experience  : {specificJob.experience}
                    </CardText>

                    {specificJob?.locations &&
                      specificJob?.locations.length > 0 &&
                      specificJob?.locations.map((location, index) => {
                        return (
                          <Col lg="12 d-flex mb-1" key={index}>
                            <span>
                              Location :{" "}
                              {
                                specificJob?.locations[index]?.job_location_id
                                  .street_address
                              }{" "}
                              ,{" "}
                              {
                                specificJob?.locations[index]?.job_location_id
                                  .city
                              }{" "}
                              ,{" "}
                              {
                                specificJob?.locations[index]?.job_location_id
                                  .state
                              }{" "}
                              ,{" "}
                              {
                                specificJob?.locations[index]?.job_location_id
                                  .country
                              }
                            </span>
                          </Col>
                        )
                      })}

                    {/*<Col lg="12 d-flex mb-1">
                      <span>
                        Location :{" "}
                        {
                          specificJob?.locations[0]?.job_location_id
                            .street_address
                        }{" "}
                        , {specificJob?.locations[0]?.job_location_id.city} ,{" "}
                        {specificJob?.locations[0]?.job_location_id.state} ,{" "}
                        {specificJob?.locations[0]?.job_location_id.country}
                      </span>
                    </Col>
                      */}
                    <Col lg="12 d-flex mb-1">
                      <span>
                        Location Type : {specificJob.job_location_type}
                      </span>
                    </Col>

                    <Col lg="12 d-flex mb-1">
                      <span>
                        Job Type{" "}
                        <Badge color="light-primary">
                          {specificJob.job_type}
                        </Badge>
                      </span>
                    </Col>

                    <CardTitle className="mt-2">
                      {t("Duties & Responsibilities")}
                    </CardTitle>
                    <CardText
                      dangerouslySetInnerHTML={{
                        __html: specificJob.job_description
                      }}
                    ></CardText>
                  </CardBody>
                </Card>
              ) : (
                <div className="text-center mt-2">
                  {loadingforSpecificJob ? (
                    <Spinner />
                  ) : (
                    <h4>No Job Description Found</h4>
                  )}
                </div>
              )}
            </Col>
          </Row>
        ) : (
          <Row>
            {fieldExists(jobs, "docs") && jobs.docs.length > 0 ? (
              jobs.docs.map((value, index) => (
                <Col key={index} md="6" lg="4" className="rounded">
                  <JobPostCard
                    jobPost={value}
                    handleApplyClick={handleApplyClick}
                  />
                </Col>
              ))
            ) : (
              <div className="text-center mt-2">
                {loading ? <Spinner /> : <h4>{t("No Jobs Found")}</h4>}
              </div>
            )}

            {isNullObject(jobs) ? null : (
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
                      pageCount={jobs?.totalPages ? jobs.totalPages : 1} //total pages
                      onPageChange={(page) => handlePagination(page)}
                      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
                    />
                  </CardBody>
                </Col>
              </Row>
            )}
          </Row>
        )}
      
    </Fragment>
  )
}
export default Home
