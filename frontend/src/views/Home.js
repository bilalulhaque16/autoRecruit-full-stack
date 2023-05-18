import * as jobActions from "@src/store/common/jobs/actions"
import * as resumeFormActions from "@src/store/common/resumeform/actions"

import { ArrowLeft, ChevronDown, RotateCw, Star, X } from "react-feather"
// ** Reactstrap Imports
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
import { Fragment, useCallback, useEffect, useState } from "react"
import {
  fieldExists,
  getJobCategories,
  getSeekerProfileId,
  isNullObject,
  isObjEmpty
} from "@src/utility/Utils"
import { useDispatch, useSelector } from "react-redux"

import CardAction from "@components/card-actions"
import { FirstLetterCapitalize } from "./../utility/Utils"
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

const MySwal = withReactContent(Swal)

const Home = () => {
  const [currentRole, setCurrentRole] = useState("")

  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "Select Plan"
  })
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0
  })

  const JobTitleOptions = [
    { value: "JAVA developer", label: "Java Developer" },
    { value: ".net developer", label: ".NET Developer" },
    { value: "CSharp developer", label: "C# Developer" },
    { value: "react developer", label: "React Developer" }
  ]

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

  const multiSelectHandler = (option) => {
    // const details = option.selectedItems
    const stringData = option.map(({ name }) => `${name}`).join(",")
    //  console.log(stringData)
    return stringData
  }

  const handleApplyClick = useCallback((id) => {
    dispatch(jobActions.clearSpecificJob())
    dispatch(jobActions.getSpecificJobRequest({ params: id }))
    if (!CardSelected) {
      setCardSelected(true)
    }
  }, [])

  // console.log("categories", multiSelectHandler(getJobCategories()))
  // useEffect(() => {
  //   // search filter for current role
  //   if (currentRole) {
  //     console.log("currentRole", currentRole)
  //     dispatch(jobActions.getAllJobsRequest({ job_title: currentRole.value }))
  //   }
  // }, [currentRole])

  useEffect(() => {
    // if future navigation is present and contains id of job
    if (futureNavigation && futureNavigation.futureNavigation) {
      const { id } = futureNavigation
      setCardSelected(true)

      // dispatch(jobActions.getSpecificJobRequest({ params: id }))
      dispatch(
        jobActions.getAllJobsRequest({
          job_category: multiSelectHandler(getJobCategories())
        })
      )
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
      dispatch(
        jobActions.getAllJobsRequest({
          job_category: multiSelectHandler(getJobCategories())
        })
      )
    }
  }, [dispatch])

  useEffect(() => {
    if (!isNullObject(jobs)) {
      // Card Selected must be true initially for length of jobs == 1
      if (jobs?.docs?.length === 1) {
        setCardSelected(true)
        dispatch(
          jobActions.getSpecificJobRequest({ params: jobs?.docs[0]?._id })
        )
      }
    }
  }, [jobs])

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
        job_category: multiSelectHandler(getJobCategories()),
        page: page.selected + 1,
        perPage: rowsPerPage
      })
    )
    setCurrentPage(page.selected)
  }

  const handlePerPage = (e) => {
    dispatch(
      jobActions.getAllJobsRequest({
        job_category: multiSelectHandler(getJobCategories()),
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

  const handleFilter = (e) => {
    e.preventDefault()
    dispatch(
      jobActions.getAllJobsRequest({
        job_category: multiSelectHandler(getJobCategories()),
        job_title: currentRole.value
      })
    )
    // dispatch(
    //   jobActions.getAllJobsRequest({
    //     role: currentRole.value,
    //     plan: currentPlan.value
    //   })
  }

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle className="center" tag="h4">
            {t("Best Way To Find Your Job")}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Row className="flex-column-reverse flex-md-row">
            <Col md="9" sm="12">
              <Label for="role-select">{t("Job Title")}</Label>
              <Select
                isClearable={false}
                options={JobTitleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                value={JobTitleOptions.find((obj) => obj.value === currentRole)}
                onChange={(data) => {
                  setCurrentRole(data)
                }}
              />
            </Col>
            {/*<Col>
              <Label for="plan-select">{t("Plan")}</Label>
              <Select
                disabled
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                value={currentPlan}
                onChange={(data) => {
                  setCurrentPlan(data)
                }}
              />
              </Col>*/}
            <Col md="1" sm="12" className="me-2">
              <Button.Ripple
                className="mt-2"
                color="primary"
                onClick={handleFilter}
                // onClick={handleFilter}
              >
                {t("Search")}
              </Button.Ripple>
            </Col>

            <Col md="1" sm="12">
              <Button.Ripple
                outline
                className="mt-2"
                color="primary"
                onClick={() => {
                  setCurrentRole("")
                  setCurrentPlan("")
                  dispatch(
                    jobActions.getAllJobsRequest({
                      job_category: multiSelectHandler(getJobCategories())
                    })
                  )
                  setCardSelected(false)
                }}
              >
                {t("Clear")}
              </Button.Ripple>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Row className="justify-content-center">
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
                      Experience : {specificJob.experience}
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
                    {/* <Col lg="12 d-flex mb-1">
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
                      </Col>*/}

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
                    <Col lg="12 d-flex">
                      <div className="demo-inline-spacing">
                        <Button
                          color="primary"
                          outline
                          onClick={handleApplyJobButtonClick}
                          disabled={loadingforApply}
                        >
                          {loadingforApply ? (
                            <Spinner className="me-1" size="sm" />
                          ) : null}

                          {t("Apply")}
                        </Button>
                      </div>
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
                  <div className="ps-2 pb-2 d-flex align-items-center mt-2">
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
                      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-2"
                    />
                  </CardBody>
                </Col>
              </Row>
            )}
          </Row>
        )}
      </Row>
    </Fragment>
  )
}
export default Home
