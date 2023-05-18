import { CardBody, Col, Button, Card, CardText } from "reactstrap"

import { Fragment, useState, useEffect } from "react"
import SkillForm from "../profileForms/SkillForm"
import { isNullObject } from "@src/utility/Utils"

import { useSelector, useDispatch } from "react-redux"

import * as seekerProfileActions from "@src/store/common/seekerProfile/actions"

const SkillsCard = ({ data }) => {
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
                    <CardText>{`Skill Name : ${item.skill_set_id.skill_set_name}`}</CardText>
                    <CardText>{`Level : ${item.skill_level}`}</CardText>
                    <hr></hr>
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
      <SkillForm
        toggleSidebar={toggleSendSidebar}
        open={sendSidebarOpen.open}
        formType={sendSidebarOpen.formType}
        data={sendSidebarOpen.data}
      />
    </Fragment>
  )
}
export default SkillsCard
