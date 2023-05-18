// ** React Imports
import { Fragment, useState } from "react"

// ** Third Party Components
import { ArrowLeft } from "react-feather"
import { useForm, Controller } from "react-hook-form"

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap"
import { EditorState, ContentState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import htmlToDraft from "html-to-draftjs"

// ** Styles
import "@styles/react/libs/editor/editor.scss"
import "@styles/base/plugins/forms/form-quill-editor.scss"

const defaultValues = {
  google: "",
  twitter: "",
  facebook: "",
  linkedin: ""
}

const SocialLinks = ({ stepper }) => {
  const initialContent = `
  <p>Cupcake ipsum dolor sit. Amet dessert donut candy chocolate bar cotton dessert candy chocolate. Candy muffin danish. Macaroon brownie jelly beans marzipan cheesecake oat cake. Carrot cake macaroon chocolate cake. Jelly brownie jelly. Marzipan pie sweet roll.</p>
  <p>Liquorice dragée cake chupa chups pie cotton candy jujubes bear claw sesame snaps. Fruitcake chupa chups chocolate bonbon lemon drops croissant caramels lemon drops. Candy jelly cake marshmallow jelly beans dragée macaroon. Gummies sugar plum fruitcake. Candy canes candy cupcake caramels cotton candy jujubes fruitcake.</p>
  `

  const contentBlock = htmlToDraft(initialContent)
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  )
  const editorState = EditorState.createWithContent(contentState)

  const [content, setContent] = useState(editorState)

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      alert("submitted")
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
            message: `Please enter a valid ${key} url`
          })
        }
      }
    }
  }

  return (
    <Fragment>
      <div className="d-flex justify-content-between">
        <div className="content-header">
          <h5 className="mb-0">Job Description</h5>
          <small>Please provide Job Description</small>
        </div>
        {/* <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button> */}
        <Button type="submit" color="success"  className="btn-submit mb-2">
          Genrate Description Using AI
        </Button>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="12" className="mb-1">
            <Editor
              editorState={content}
              editorStyle={{ height: "400px" }}
              onEditorStateChange={(data) => setContent(data)}
            />
            {/* <Input
              name="job_description"
              onChange={handleChange}
              value={values.job_description}
              onBlur={handleBlur}
              type="textarea"
              cols="3"
              rows="3"
              id="invoice-message"
            /> */}
            {/* {isSubmit && errors.job_description && (
              <div className="text-danger">{errors.job_description}</div>
            )} */}
            {/* {errors.twitter && <FormFeedback>{errors.twitter.message}</FormFeedback>} */}
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>
          <Button type="submit" color="success" className="btn-submit">
            Submit
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default SocialLinks
