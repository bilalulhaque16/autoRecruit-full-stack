import Sidebar from "@components/sidebar"
import { useFormik } from "formik"
import * as Yup from "yup"
// ** Icons Imports
// import { Link } from "react-feather"
// ** Reactstrap Imports
import {
  Form,
  Input,
  Label,
  Badge,
  Col,
  Row,
  CardBody,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap"
// ** Third Party Component
import Select from "react-select"
import { selectThemeColors } from "@utils"
import Avatar from "@components/avatar"

const SkillForm = ({ open, toggleSidebar }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      dob: "",
      gender: "",
      mobileNumber: "",
      registrationDate: "",
      emailSwiitch:"no",
      smsSwitch:"no"
    },
    onSubmit: (values) => {
      console.log("form data", values)
    }
  })
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue
  } = formik

  const genderOption = [
    { value: "male", label: "male" },
    { value: "female", label: "female" }
  ]

  return (
    <Sidebar
      width={500}
      size="lg"
      open={open}
      title="Edit Account"
      headerClassName="mb-1"
      contentClassName="p-0"
      bodyClassName="pb-sm-0 pb-3"
      toggleSidebar={toggleSidebar}
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <div className="d-flex justify-content-center align-items-center mb-1">
          <Avatar
            className="me-1"
            imgHeight="10"
            imgWidth="10"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
        <div className="profile-user-info d-flex justify-content-center">
          <h6 className="mb-0">Change ProfIle Image</h6>
          <hr></hr>
        </div>

        <div className="mb-1">
          <Row>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="nameMulti">
                Email
              </Label>
              <Input
                type="text"
                name="email"
                id="nameMulti"
                placeholder="enter email"
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="lastNameMulti">
                Password
              </Label>
              <Input
                type="text"
                name="password"
                id="lastNameMulti"
                placeholder="enter password"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
              />
            </Col>
          </Row>
        </div>
        <div className="mb-1">
          <Row>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="nameMulti">
                DOB
              </Label>
              <Input
                type="text"
                name="dob"
                id="nameMulti"
                placeholder="First DOB"
                onChange={handleChange}
                value={values.dob}
                onBlur={handleBlur}
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label for="invoice-to" className="form-label">
                Gender*
              </Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                defaultValue={genderOption[0]}
                options={genderOption}
                isClearable={false}
                name="gender"
                value={values.gender}
                onChange={(e) => {
                  setFieldValue("gender", e.value)
                }}
              />
            </Col>
          </Row>
        </div>
        <div className="mb-1">
          <Row>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="nameMulti">
                Mobille Number
              </Label>
              <Input
                type="number"
                name="mobileNumber"
                id="nameMulti"
                placeholder=""
                onChange={handleChange}
                value={values.mobileNumber}
                onBlur={handleBlur}
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="lastNameMulti">
                Registration Date
              </Label>
              <Input
                type="text"
                name="registrationDate"
                id="lastNameMulti"
                placeholder=""
                onChange={handleChange}
                value={values.registrationDate}
                onBlur={handleBlur}
              />
            </Col>
          </Row>
        </div>

        <div className="mb-1">
          <Row>
            {/* <div className='demo-inline-spacing'> */}
            <Col md="5" sm="12" lg="6" className="mb-1">
              <div className="form-check form-switch">
                <Label for="exampleCustomSwitch" className="form-check-label">
                  SMS Notification
                </Label>
                <Input
                  type="switch"
                  name="smsSwitch"
                  id="exampleCustomSwitch"
                //   onChange={handleChange}
                onChange={(e) => {
                    console.log(e)
                    // setFieldValue("smsSwitch", e.value)
                  }}
                  value={values.smsSwitch}
                  onBlur={handleBlur}
                />
              </div>
            </Col>
            <Col md="5" sm="12" lg="6" className="mb-1">
              <div className="form-check form-switch">
                <Label for="exampleCustomSwitch" className="form-check-label">
                  Email Notification
                </Label>
                <Input
                  type="switch"
                  name="emailSwitch"
                  id="exampleCustomSwitch"
                  onChange={handleChange}
                  value={values.emailSwiitch}
                  onBlur={handleBlur}
                />
              </div>
            </Col>
            {/* </div> */}
          </Row>
        </div>

        <div className="d-flex flex-wrap mt-2" style={{ paddingLeft: "130px" }}>
          <Button type="submit" className="me-1" color="primary" onClick={toggleSidebar}>
            Save
          </Button>
          <Button color="secondary" outline onClick={toggleSidebar}>
            Cancel
          </Button>
        </div>
      </Form>
    </Sidebar>
  )
}

export default SkillForm
