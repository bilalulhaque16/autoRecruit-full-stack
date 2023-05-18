import * as getApplicationActions from "@src/store/common/jobs/actions"

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  Offcanvas,
  OffcanvasHeader,
  Row,
  TabContent,
  TabPane
} from "reactstrap"
import {
  AlignJustify,
  Bell,
  Bookmark,
  Edit,
  Image,
  Info,
  Lock,
  Rss,
  User,
  Users
} from "react-feather"
import {
  FirstLetterCapitalize,
  fieldExists,
  formatDateToShow,
  isNullObject
} from "./../utility/Utils"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import CardAction from "@components/card-actions"
import { Fragment } from "react"
import { PropTypes } from "prop-types"

// import { Navigate, navigation } from "react-router-dom"

const JobApplication = (props) => {
  const { job } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Fragment>
      <Card>
        <CardBody className="pt-0">
          <CardTitle className=" mt-2">
            {fieldExists(job, "job_post_id") ? job.job_post_id.job_title : ""}
          </CardTitle>
          <Row>
            <Col lg="5" md="5" sm="5">
              <CardText>ID : {job._id}</CardText>
              <CardText>
                Date Applied : {formatDateToShow(job.apply_date)}
              </CardText>
              <CardText>
                Job Type :{" "}
                {fieldExists(job, "job_post_id")
                  ? job.job_post_id.job_type
                  : ""}{" "}
              </CardText>
            </Col>
            <Col lg="4" md="4" sm="4">
              <CardText>Applied Status: {job.job_application_status} </CardText>
              <CardText>Interview Level: {job.level}</CardText>

              {job?.locations &&
                job?.locations.length > 0 &&
                job?.locations.map((location, index) => {
                  return (
                    <Col lg="12 d-flex mb-1" key={index}>
                      <span>
                        Location : {job?.locations[index]?.street_address} ,{" "}
                        {job?.locations[index]?.city} ,{" "}
                        {job?.locations[index]?.state} ,{" "}
                        {job?.locations[index]?.country}
                      </span>
                    </Col>
                  )
                })}
            </Col>

            <Col lg="3" md="3" sm="3">
              <Button.Ripple
                // tag={Link}
                // to={`/applications/${job._id}`}
                color="primary"
                onClick={() => {
                  localStorage.setItem("jobId", job._id)
                  // clear the state
                  dispatch(getApplicationActions.clearSpecificAppliedJob())
                  dispatch(
                    getApplicationActions.getSpecificAppliedJobRequest({
                      params: job._id
                    })
                  )
                  navigate(`/applications/${job._id}`)
                }}
              >
                Check Status
              </Button.Ripple>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default JobApplication
