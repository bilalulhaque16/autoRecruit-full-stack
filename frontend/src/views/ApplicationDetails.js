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
        <Card>
          <CardBody>
            <Row>
              <Col lg="7">
                <ArrowLeft
                  onClick={() => {
                    localStorage.removeItem("jobId")
                    navigate("/applications")
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
                      {appliedJob.job_post_id.locations[0].job_location_id.city}{" "}
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
            </Row>
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
    </Fragment>
  )
}

export default ApplicationDetails
