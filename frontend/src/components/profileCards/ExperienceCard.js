import { CardBody, Col, Button, Card, CardText } from "reactstrap"

import { Fragment, useState, useEffect } from "react"

import { isNullObject, formatDateToShow } from "@src/utility/Utils"
import ExperienceForm from "@src/components/profileForms/ExperienceForm"

import { useSelector, useDispatch } from "react-redux"

import * as seekerProfileActions from "@src/store/common/seekerProfile/actions"

const ExperienceCard = ({ data }) => {
  const dispatch = useDispatch()
  const { success } = useSelector((state) => state.seekerProfileReducer)
  const [sendSidebarOpen, setSendSidebarOpen] = useState({
    open: false,
    data: {},
    formType: ""
  })

  useEffect(() => {
    if (success) {
      setSendSidebarOpen({
        open: false,
        data: {},
        formType: ""
      })
      dispatch(seekerProfileActions.clearResponse())
    }
  }, [success])

  const toggleSendSidebar = () =>
    setSendSidebarOpen({
      open: !sendSidebarOpen.open,
      data: {},
      formType: ""
    })

  return (
    <Fragment>
      <Card>
        <CardBody className="pt-0">
          {!isNullObject(data)
            ? data.map((item, index) => {
                return (
                  <div className="pt-2" key={index}>
                    <Col>
                      <Button.Ripple
                        outline
                        color="primary"
                        className="align-center"
                        style={{
                          float: "right",
                          position: "relative",
                          top: "5px",
                          left: "-20px"
                        }}
                        size="sm"
                        onClick={() => {
                          setSendSidebarOpen({
                            open: true,
                            data: item,
                            formType: "edit"
                          })
                        }}
                      >
                        Edit
                      </Button.Ripple>
                    </Col>

                    <div>
                      <CardText
                        style={{ fontWeight: "bold", fontSize: "20px" }}
                      >{`> ${item.job_title}`}</CardText>
                      <CardText> Company : {item.company_name}</CardText>
                      <CardText>{`Start Date : ${formatDateToShow(
                        item.start_date
                      )} - End Date : ${formatDateToShow(
                        item.end_date
                      )}`}</CardText>

                      <CardText>{item.description}</CardText>
                      <CardText>
                        {`${item.job_location_city}, ${item.job_location_state}, ${item.job_location_country}`}
                      </CardText>
                      <hr></hr>
                    </div>
                  </div>
                )
              })
            : null}

          <div className="demo-inline-spacing">
            <Button
              color="primary"
              onClick={() => {
                setSendSidebarOpen({
                  open: true,
                  data: {},
                  formType: "add"
                })
              }}
            >
              Add
            </Button>
          </div>
        </CardBody>
      </Card>

      <ExperienceForm
        toggleSidebar={toggleSendSidebar}
        open={sendSidebarOpen.open}
        formType={sendSidebarOpen.formType}
        data={sendSidebarOpen.data}
      />
    </Fragment>
  )
}
export default ExperienceCard
