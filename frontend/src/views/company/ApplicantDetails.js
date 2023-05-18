import * as getApplicationActions from "@src/store/common/jobs/actions"

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Input,
  Progress,
  Row,
  Spinner
} from "reactstrap"
import {
  FirstLetterCapitalize,
  fieldExists,
  formatDateToShow,
  isNullObject
} from "@src/utility/Utils"
import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { ArrowLeft } from "react-feather"
import Timeline from "@components/timeline"
import { useNavigate } from "react-router-dom"

// ** Reactstrap Imports

const ApplicationDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const appliedJob = useSelector((state) => state.jobsReducer.appliedJob)
  const loadingforSpecificJob = useSelector(
    (state) => state.jobsReducer.loadingforSpecificJob
  )

  useEffect(() => {
    if (
      isNullObject(appliedJob) &&
      localStorage.getItem("jobId") &&
      !loadingforSpecificJob
    ) {
      console.log("here", localStorage.getItem("jobId"))

      dispatch(
        getApplicationActions.getSpecificAppliedJobRequest({
          params: localStorage.getItem("jobId")
        })
      )
    } else if (isNullObject(appliedJob) && !localStorage.getItem("jobId")) {
      // clear state
      dispatch(getApplicationActions.clearSpecificAppliedJob())
      navigate("/applications")
    }
  }, [dispatch])

  const data = [
    {
      title: "Pre-Screening",
      content: "Invitation Received",
      meta: "12 mins ago",
      customContent: (
        <div className="d-flex align-items-center mb-50">
          <Row>
            <Col lg="12 d-flex">
              {/* <div className="demo-inline-spacing ">
                <Button color="primary" outline size="sm">
                  Accept
                </Button>
                <Button color="primary" outline size="sm">
                  Reject
                </Button>
              </div>
      */}
            </Col>

            {/*  <Col lg="10">
              <br></br>
              <Input
                type="textarea"
                name="text"
                id="exampleText"
                rows="2"
                placeholder="Textarea"
              />
              <br></br>
              <Button color="primary" outline size="sm">
                send
              </Button>
    </Col>*/}
          </Row>
        </div>
      )
    },
    {
      title: "Technical Interview",
      content: "Invitation Received",
      meta: "45 mins ago",
      color: "warning"
    },
    {
      title: "HR Interview",
      content: "Invitation Received",
      meta: "2 days ago",
      color: "info"
    }
  ]

  return (
    <Fragment>
      {!isNullObject(appliedJob) && fieldExists(appliedJob, "job_post_id") ? (
        <div>
          <Card>
            <CardBody>
              <Row>
                <Col lg="7">
                  <ArrowLeft
                    onClick={() => {
                      localStorage.removeItem("jobId")
                      navigate("/applicants")
                    }}
                    className="mb-2"
                  />

                  <CardTitle>{appliedJob.job_post_id.job_title}</CardTitle>

                  <CardText>About this Job</CardText>
                  <CardText>
                    Job Type :{" "}
                    {isNullObject(appliedJob.job_post_id.job_type)
                      ? "N/A"
                      : FirstLetterCapitalize(appliedJob.job_post_id.job_type)}
                  </CardText>
                  <CardText>
                    Shift :{" "}
                    {isNullObject(appliedJob.job_post_id.job_shift)
                      ? "N/A"
                      : FirstLetterCapitalize(appliedJob.job_post_id.job_shift)}
                  </CardText>
                  <CardText className="">
                    Experience :{" "}
                    {appliedJob.job_post_id.experience
                      ? appliedJob.job_post_id.experience
                      : "No Experience Required"}
                  </CardText>

                  <Col lg="12 d-flex mb-1">
                    <div>
                      <span>
                        Location :{" "}
                        {
                          appliedJob.job_post_id.locations[0].job_location_id
                            .street_address
                        }{" "}
                        ,{" "}
                        {
                          appliedJob.job_post_id.locations[0].job_location_id
                            .city
                        }{" "}
                        ,{" "}
                        {
                          appliedJob.job_post_id.locations[0].job_location_id
                            .state
                        }{" "}
                        ,{" "}
                        {
                          appliedJob.job_post_id.locations[0].job_location_id
                            .country
                        }
                      </span>
                    </div>
                  </Col>

                  <Col lg="12 d-flex mb-1">
                    <span>
                      Location Type : {appliedJob.job_post_id.job_location_type}
                    </span>
                  </Col>

                  <Col lg="12 d-flex mb-1">
                    <span>
                      Job Type{" "}
                      <Badge color="light-primary">
                        {appliedJob.job_post_id.job_type}
                      </Badge>
                    </span>
                  </Col>

                  <CardTitle className="mt-2">
                    Duties & Responsibilities
                  </CardTitle>
                  <CardText
                    dangerouslySetInnerHTML={{
                      __html: appliedJob.job_post_id.job_description
                    }}
                  ></CardText>
                </Col>
                <Col lg="5">
                  <Card color="light">
                    <CardHeader>
                      <CardTitle tag="h2">Interview Levels</CardTitle>
                    </CardHeader>
                    <CardBody className="pt-0" size="sm">
                      <Timeline tag="div" data={data} className="ms-50" />
                    </CardBody>
                  </Card>
                </Col>
                {!isNullObject(appliedJob) &&
                fieldExists(appliedJob, "seeker_profile_id") ? (
                  <Col lg="7" className="mt-3">
                    <h4 style={{ fontWeight: "bold" }}>Applicant Detail</h4>
                    <hr></hr>
                    <h4></h4>
                    <br></br>
                    {/*  <h5>Job Title : UI/UX Designer</h5>
                  <h5>Experience : 2yr</h5>*/}
                    <br></br>
                    <Row>
                      <h4 style={{ fontWeight: "bold" }}>Address</h4>
                      <Col lg="6">
                        <h6>Address Line </h6>
                        <p>
                          {
                            appliedJob?.seeker_profile_id?.personal_info
                              ?.address
                          }
                        </p>
                        <h6>City </h6>
                        <h6>
                          {appliedJob?.seeker_profile_id?.personal_info?.city}
                        </h6>
                      </Col>
                      <Col lg="6">
                        <h5>Email</h5>
                        <p>
                          {appliedJob?.seeker_profile_id?.personal_info?.email}
                        </p>
                      </Col>
                    </Row>
                    <br></br>
                    {appliedJob?.seeker_profile_id?.personal_info
                      ?.phone_number && (
                      <>
                        <h4 style={{ fontWeight: "bold" }}>Phone Number</h4>
                        <p>
                          {
                            appliedJob?.seeker_profile_id?.personal_info
                              ?.phone_number
                          }
                        </p>
                      </>
                    )}
                    <br></br>
                    <Row>
                      <h4 style={{ fontWeight: "bold" }}>Work Experience</h4>
                      {appliedJob?.seeker_profile_id?.work_and_experience
                        ?.experience_details?.length > 0
                        ? appliedJob?.seeker_profile_id?.work_and_experience?.experience_details?.map(
                            (work, index) => (
                              <Col lg="6" key={index}>
                                <h6 style={{ fontWeight: "bold" }}>
                                  Work Experience {index + 1}
                                </h6>
                                <h6>Job Title</h6>
                                <p>{work.job_title}</p>
                                <h6>Company</h6>
                                <p>{work.company_name}</p>
                                <h6>Start Date</h6>
                                <p>
                                  {formatDateToShow(work.start_date)} -{" "}
                                  {work.is_current_job
                                    ? "Present"
                                    : formatDateToShow(work.end_date)}
                                </p>
                              </Col>
                            )
                          )
                        : null}
                    </Row>
                    <br></br>
                    <Row>
                      <h4 style={{ fontWeight: "bold" }}>Education</h4>
                      {appliedJob?.seeker_profile_id?.work_and_experience
                        ?.education_details?.length > 0
                        ? appliedJob?.seeker_profile_id?.work_and_experience?.education_details?.map(
                            (education, index) => (
                              <Col lg="6" key={index}>
                                <h6 style={{ fontWeight: "bold" }}>
                                  Education {index + 1}
                                </h6>
                                <h6>School or University</h6>
                                <p>{education.institute_university_name}</p>
                                <h6>Degree</h6>
                                <p>{education.certificate_degree_name}</p>
                                <h6>Field of Study</h6>
                                <p>{education.field_of_study}</p>
                                <h6>Grade</h6>
                                <p>
                                  {education?.cgpa
                                    ? education.cgpa
                                    : education?.percentage
                                    ? education.percentage
                                    : ""}
                                </p>
                                <h6>Start Date</h6>
                                <p>
                                  {formatDateToShow(education.starting_date)} -{" "}
                                  {education.is_current_job
                                    ? "Present"
                                    : formatDateToShow(
                                        education.completion_date
                                      )}
                                </p>
                              </Col>
                            )
                          )
                        : null}
                    </Row>
                    <br></br>
                    <Row>
                      <Col lg="6">
                        <h4 style={{ fontWeight: "bold" }}>Languages</h4>
                        {appliedJob?.seeker_profile_id?.work_and_experience
                          ?.seeker_languages?.length > 0
                          ? appliedJob?.seeker_profile_id?.work_and_experience?.seeker_languages?.map(
                              (language, index) => (
                                <div key={index}>
                                  <h6>Language</h6>
                                  <p>{language.language}</p>
                                  <h6>Speaking Proficiency</h6>
                                  <p>{language.speaking_proficiency}</p>
                                  <h6>Reading Proficiency</h6>
                                  <p>{language.reading_proficiency}</p>
                                </div>
                              )
                            )
                          : null}
                      </Col>
                      <Col lg="6">
                        <h4 style={{ fontWeight: "bold" }}>Resume/CV</h4>
                        <p>
                          <a
                            href={
                              appliedJob?.seeker_profile_id?.personal_info
                                ?.resume_url || ""
                            }
                            target="_blank"
                          >
                            Click here to view resume
                          </a>
                        </p>
                        <h4 style={{ fontWeight: "bold" }}>
                          Social Network ( URLs )
                        </h4>
                        {appliedJob?.seeker_profile_id?.personal_info?.links
                          .length > 0
                          ? appliedJob?.seeker_profile_id?.personal_info?.links.map(
                              (link, index) => (
                                <div key={index}>
                                  <p>
                                    <a href={link.url} target="_blank">
                                      {link.platform}
                                    </a>
                                  </p>
                                </div>
                              )
                            )
                          : null}
                      </Col>
                    </Row>

                    <h4 style={{ fontWeight: "bold" }}>Questions</h4>
                    <h6>
                      Would you like to receive mobile text message updates from
                      ( Company ) regarding the recruiting process? If so,
                      choose to Option - ( Yes or No ). *
                    </h6>
                    <p>
                      {appliedJob?.seeker_profile_id?.seeker_questions[0]?.ans}
                    </p>
                    <h6>Are you willing to relocate your job? *</h6>
                    <p>
                      {appliedJob?.seeker_profile_id?.seeker_questions[1]?.ans}
                    </p>
                    <h6>
                      Do you have a direct family member who currently works for
                      ( Company )? *
                    </h6>
                    <p>
                      {appliedJob?.seeker_profile_id?.seeker_questions[2]?.ans}
                    </p>
                    <h6>
                      Have you previously worked for company as a Employee? *
                    </h6>
                    <p>
                      {appliedJob?.seeker_profile_id?.seeker_questions[3]?.ans}
                    </p>
                    <h6>
                      Can you verify your authorization to work in the ( Country
                      ) if hired for this position? *
                    </h6>
                    <p>
                      {appliedJob?.seeker_profile_id?.seeker_questions[4]?.ans}
                    </p>
                  </Col>
                ) : null}
              </Row>
            </CardBody>
          </Card>
        </div>
      ) : (
        <div className="text-center mt-2">
          {loadingforSpecificJob ? (
            <Spinner />
          ) : (
            <h4>No Job Description Found</h4>
          )}
        </div>
      )}
    </Fragment>
  )
}

export default ApplicationDetails
