import * as seekerProfileActions from "@src/store/common/seekerProfile/actions"

import { Bell, Bookmark, Lock, User } from "react-feather"
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap"
import { Fragment, useEffect, useState } from "react"
import { fieldExists, getSeekerProfileId } from "@src/utility/Utils"
import { useDispatch, useSelector } from "react-redux"

import EducationCard from "@src/components/profileCards/EducationCard"
import ExperienceCard from "@src/components/profileCards/ExperienceCard"
import LanguageCard from "@src/components/profileCards/LanguageCard"
import ProfileForm from "../components/ProfileForm"
import SkillsCard from "@src/components/profileCards/SkillsCard"
import img from "../assets/images/portrait/small/no_img.jpg"

const Profile = () => {
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  const [active, setActive] = useState("1")
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen)

  const dispatch = useDispatch()

  const seekerProfile = useSelector((state) => state.seekerProfileReducer)

  const { successforpatch, successforpost } = seekerProfile

  useEffect(() => {
    if (successforpatch || successforpost) {
      // for rerendering
      dispatch(
        seekerProfileActions.getProfileRequest({
          params: getSeekerProfileId()
        })
      )
      dispatch(seekerProfileActions.clearResponse())
    }
  }, [successforpatch, successforpost])

  const {
    data,
    loading,
    error,
    skills,
    languages,
    educations,
    experiences,
    success
  } = useSelector((state) => state.seekerProfileReducer)

  useEffect(() => {
    dispatch(
      seekerProfileActions.getProfileRequest({
        params: getSeekerProfileId()
      })
    )
  }, [dispatch])

  useEffect(() => {
    if (success) {
      dispatch(seekerProfileActions.clearResponse())
    }
  }, [success])

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return (
    <Fragment>
      <Row>
        <Col lg="4" md="4">
          <Card title="Profile Detail" actions="collapse">
            <div id="user-profile">
              <Row>
                <Col sm="12">
                  <Card className="profile-header mb-0">
                    <div className="profile-img-container d-flex align-items-center pt-5">
                      <div
                        className="profile-img"
                        style={{
                          marginLeft: "auto",
                          marginRight: "auto",
                          display: "block"
                        }}
                      >
                        <img
                          className="rounded img-fluid rounded"
                          src={img}
                          alt="Card image"
                          style={{ height: "100px", width: "100px" }}
                        />
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
            <ProfileForm
              toggleSidebar={toggleSendSidebar}
              open={sendSidebarOpen}
            />

            <CardBody className="pt-2">
              <div style={{ textAlign: "center" }}>
                <h5>
                  {fieldExists(data, "user_account_id")
                    ? data.user_account_id.full_name
                    : ""}
                </h5>
                {/* <CardText>UI/UX Designer</CardText>*/}
              </div>
              <h4 className="fw-bolder border-bottom pb-50 mb-1 pt-2">
                Details
              </h4>
              <div className="info-container">
                <ul className="list-unstyled">
                  <li className="mb-75">
                    <span className="fw-bolder me-25">Email : </span>
                    <span>
                      {fieldExists(data, "user_account_id")
                        ? data.user_account_id.email
                        : ""}
                    </span>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">Age : </span>
                    <span>
                      {fieldExists(data, "personal_info")
                        ? data.personal_info.age
                        : ""}
                    </span>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">Gender : </span>
                    <span>
                      {fieldExists(data, "user_account_id")
                        ? data.user_account_id.gender
                        : ""}
                    </span>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">Contact Number : </span>
                    <span>
                      {fieldExists(data, "user_account_id")
                        ? data.user_account_id.contact_number
                        : ""}
                    </span>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">Address : </span>
                    <span className="text-capitalize">
                      {fieldExists(data, "personal_info")
                        ? data.personal_info.address
                        : ""}
                    </span>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">City : </span>
                    <span>
                      {fieldExists(data, "personal_info")
                        ? data.personal_info.city
                        : ""}
                    </span>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">Country : </span>
                    <span>
                      {fieldExists(data, "personal_info")
                        ? data.personal_info.country
                        : ""}
                    </span>
                  </li>

                  <li className="mb-75">
                    <span className="fw-bolder me-25">Resume URL : </span>
                    <span>
                      {fieldExists(data, "personal_info") ? (
                        <a
                          href={data.personal_info.resume_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Link to Resume
                        </a>
                      ) : (
                        ""
                      )}
                    </span>
                  </li>
                </ul>
              </div>
              {/* <div className="d-flex justify-content-center pt-2">
                <Button
                  color="primary"
                  onClick={() => {
                    setSendSidebarOpen(true)
                  }}
                >
                  Edit
                </Button>
                {/*  <Button className="ms-1" color="danger" outline>
                  Suspended
                </Button>*/}
              {/*</div>*/}
            </CardBody>
          </Card>
        </Col>

        <Col md="8" sm="12" lg="8">
          <Nav pills className="mb-2" style={{ width: "100%" }}>
            <NavItem>
              <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
                <User className="font-medium-3 me-50" />
                <span className="fw-bold">Experience</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
                <Lock className="font-medium-3 me-50" />
                <span className="fw-bold">Education</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
                <Bookmark className="font-medium-3 me-50" />
                <span className="fw-bold">Skills</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
                <Bell className="font-medium-3 me-50" />
                <span className="fw-bold">Language</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={active}>
            <TabPane tabId="1">
              <ExperienceCard data={experiences ? experiences : []} />
            </TabPane>
            <TabPane tabId="2">
              <EducationCard data={educations ? educations : []} />
            </TabPane>
            <TabPane tabId="3">
              <SkillsCard data={skills ? skills : []} />
            </TabPane>
            <TabPane tabId="4">
              <LanguageCard data={languages ? languages : []} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  )
}

export default Profile
