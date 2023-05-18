import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Progress,
  Row
} from "reactstrap"
import {
  FirstLetterCapitalize,
  capitalizeEachWord,
  fieldExists
} from "./../utility/Utils"

import { Fragment } from "react"
import classnames from "classnames"
import propTypes from "prop-types"
import { useTranslation } from "react-i18next"
import AvatarGroup from "@src/@core/components/avatar-group"
import Avatar from "@src/@core/components/avatar"
import { Calendar, Heart, MapPin, ShoppingCart } from "react-feather"

// ** Third Party Components

export const JobPostCard = (props) => {
  const { t } = useTranslation()
  const { jobPost, handleApplyClick, CardSelected, id } = props

  const GetDateTimeRangeBasedOnDate = (date) => {
    const today = new Date()
    const jobPostDate = new Date(date)
    const diffTime = Math.abs(today - jobPostDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Yesterday"
    }
    // if days are more than 365 then show years
    else if (diffDays > 365) {
      const diffYears = Math.ceil(diffDays / 365)
      return `${diffYears} years ago`
    }
    // if days are more than 28 or 30 or 31 then show months
    else if (diffDays > 30) {
      const diffMonths = Math.ceil(diffDays / 30)
      return `${diffMonths} months ago`
    }
    // if days are more than 7 then show weeks
    else if (diffDays > 7) {
      const diffWeeks = Math.ceil(diffDays / 7)
      return `${diffWeeks} weeks ago`
    }
    // if days are less than 7 then show days
    else {
      return `${diffDays} days ago`
    }
  }
  const data = [
    {
      title: "Billy Hopkins",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-9.jpg").default,
      imgHeight: 33,
      imgWidth: 33
    },
    {
      title: "Amy Carson",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-6.jpg").default,
      imgHeight: 33,
      imgWidth: 33
    },
    {
      title: "Brandon Miles",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-8.jpg").default,
      imgHeight: 33,
      imgWidth: 33
    },
    {
      meta: "+42"
    }
  ]

  return (
    <Fragment>
      <Card className="card-developer-meetup card-app-design">
        <CardBody style={{padding:'10px'}}>
          <CardHeader className="bg-light-primary rounded">
            <div
              className="meetup-header d-flex align-items-center"
              style={{ marginBottom: 0 }}
            >
              <div className="meetup-day">
                <h6 className="mb-0">THU</h6>
                <h3 className="mb-0">24</h3>
              </div>
              <div className="my-auto">
                <CardTitle tag="h4" className="mb-25">
                  {jobPost.job_title}
                </CardTitle>
                <CardText className="mb-0">
                  {jobPost.job_category_id?.name}
                </CardText>
              </div>
            </div>
          </CardHeader>
          {/* <AvatarGroup data={data} /> */}
          {/* <img class="congratulation-medal" src="/static/media/badge.2936ed83.svg" alt="Medal Pic"></img> */}
          {/* <div className='d-flex'>
          <Avatar color='light-primary' className='rounded me-1' icon={<Calendar size={18} />} />
          <div>
            <h6 className='mb-0'>Sat, May 25, 2020</h6>
            <small>10:AM to 6:PM</small>
          </div>
        </div>
        <div className='d-flex mt-2'>
          <Avatar color='light-primary' className='rounded me-1' icon={<MapPin size={18} />} />
          <div>
            <h6 className='mb-0'>Central Park</h6>
            <small>Manhattan, New york City</small>
          </div>
        </div> */}

          <div className="design-group mb-2 pt-50">
            <h6 className="section-label">Location</h6>
            <Col lg="12 d-flex mb-1">
              {jobPost?.locations &&
                jobPost?.locations.length > 0 &&
                jobPost?.locations.map((location, index) => {
                  return (
                    <Badge className="me-1" color="light-warning" key={index}>
                      {jobPost?.locations[index]?.city}
                    </Badge>
                  )
                })}
            </Col>
          </div>

          <Row className="design-planning-wrapper py-75" style={{paddingLeft:'10px'}} >
            <Col className="design-planning" md="3" lg="3" xl="2">
              <CardText className="mb-25" style={{fontSize: '10px', fontWeight:'bold'}}>Experience</CardText>
              <h6 className="mb-0" style={{fontSize: '13px', fontWeight:'bold'}}>{jobPost.experience}</h6>
            </Col>
            <Col className="design-planning" md="3" lg="3"  xl="2">
              <CardText className="mb-25" style={{fontSize: '10px', fontWeight:'bold'}}>Job Type</CardText>
              <h6 className="mb-0" style={{fontSize: '13px', fontWeight:'bold'}}>{jobPost.job_type}</h6>
            </Col>
            <Col className="design-planning" md="3" lg="3"  xl="2">
              <CardText className="mb-25" style={{fontSize: '10px', fontWeight:'bold'}}>Job Shift</CardText>
              <h6 className="mb-0" style={{fontSize: '13px', fontWeight:'bold'}}>{jobPost.job_shift}</h6>
            </Col>
            <Col  md="3"  xl="2" className="design-planning  d-none d-xxl-block">
              <CardText className="mb-25" style={{fontSize: '10px', fontWeight:'bold'}}>Location Type</CardText>
              <h6 className="mb-0" style={{fontSize: '13px', fontWeight:'bold'}}>{jobPost.job_location_type}</h6>
            </Col>

            </Row>
{/* 
          <div className="design-planning-wrapper py-75">
            <div className="design-planning">
              <CardText className="mb-25" style={{fontSize: '10px', fontWeight:'bold'}}>Experience</CardText>
              <h6 className="mb-0" style={{fontSize: '13px', fontWeight:'bold'}}>{jobPost.experience}</h6>
            </div>
            <div className="design-planning">
              <CardText className="mb-25" style={{fontSize: '10px', fontWeight:'bold'}}>Job Type</CardText>
              <h6 className="mb-0" style={{fontSize: '13px', fontWeight:'bold'}}>{jobPost.job_type}</h6>
            </div>
            <div className="design-planning">
              <CardText className="mb-25" style={{fontSize: '10px', fontWeight:'bold'}}>Job Shift</CardText>
              <h6 className="mb-0" style={{fontSize: '13px', fontWeight:'bold'}}>{jobPost.job_shift}</h6>
            </div>
            <div className="design-planning">
              <CardText className="mb-25" style={{fontSize: '10px', fontWeight:'bold'}}>Location Type</CardText>
              <h6 className="mb-0" style={{fontSize: '13px', fontWeight:'bold'}}>{jobPost.job_location_type}</h6>
            </div>

            </div> */}

            
            {/* <div className="design-planning">
              <CardText className="mb-25">Expiry Date</CardText>
              <h6 className="mb-0">Month After</h6>
            </div> */}
          {/* <div className="apply-job-package bg-light-primary rounded">
            <div>
              <sup className="text-body">
                <small>$</small>
              </sup>
              <h2 className="d-inline me-25">9,800</h2>
              <sub className="text-body">
                <small>/ month</small>
              </sub>
            </div>
            <Badge color="light-primary" pill>
              Full Time
            </Badge>
          </div> */}
          {/* <div className="d-grid">
            <Button color="primary">Apply For This Job</Button>
          </div> */}
          {/* <AvatarGroup data={""} /> */}
        </CardBody>
        <div className="item-options text-center">
          {/* <Button
            className="btn-wishlist"
            style={{ width: "50%", borderRadius: 0 }}
            color="light"
            // onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
          >
            <Heart className={classnames("me-50")} size={14} />
            <span>Share With Friends</span>
          </Button> */}
          <Button
            color="primary"
            // tag={CartBtnTag}
            style={{ width: "100%", borderRadius: 0 }}
            className="btn-cart move-cart"
            
            onClick={() => handleApplyClick(jobPost._id)}
            /*eslint-disable */
            // {...(item.isInCart
            //   ? {
            //       to: '/apps/ecommerce/checkout'
            //     }
            //   : {})}
            /*eslint-enable */
          >
            <ShoppingCart className="me-50" size={14} />
            <span>View Details</span>
          </Button>
        </div>
      </Card>

      {/* <Row className="align-items-center justify-content-end d-flex">
          <Col lg="9" md="9" sm="9">
            <CardHeader
              style={{ fontSize: "20px", fontWeight: "bold", fontSize: "18px" }}
            >
              {jobPost.job_title}
            </CardHeader>
          </Col>
          <Col lg="3" md="3" sm="3">
            <Badge
              className="text-capitalize"
              color={
                jobPost.job_status === "active"
                  ? "light-success"
                  : "light-warning"
              }
              pill
            >
              {jobPost.job_status}
            </Badge>
          </Col>
        </Row> */}
      {/* <CardBody style={{ marginTop: "-20px" }}>
          <CardText className="">Experience : {jobPost.experience}</CardText>

          {jobPost?.locations &&
            jobPost?.locations.length > 0 &&
            jobPost?.locations.map((location, index) => {
              return (
                <Col lg="12 d-flex mb-1" key={index}>
                  <span>
                    Location : {jobPost?.locations[index]?.street_address} ,{" "}
                    {jobPost?.locations[index]?.city} ,{" "}
                    {jobPost?.locations[index]?.state} ,{" "}
                    {jobPost?.locations[index]?.country}
                  </span>
                </Col>
              )
            })}

         
          <Col lg="12 d-flex mb-1">
            <span>Location Type : {jobPost.job_location_type}</span>
          </Col>

          <Col lg="12 d-flex mb-1">
            <span>
              Job Type : <Badge color="light-primary">{jobPost.job_type}</Badge>
            </span>
          </Col>
          <Col lg="12 d-flex mb-1">
            <span>
              Job Shift :{" "}
              <Badge color="light-primary">{jobPost.job_shift}</Badge>
            </span>
          </Col>
          <CardText className="mt-0">
            Posted {GetDateTimeRangeBasedOnDate(jobPost.created_date)}
          </CardText>
        </CardBody> */}
    </Fragment>
  )
}

JobPostCard.propTypes = {
  jobPost: propTypes.object.isRequired,
  handleApplyClick: propTypes.func.isRequired
}
