import * as Yup from "yup"
import * as jobCategoryActions from "@src/store/common/jobcategory/actions"

import { Button, Form, Input, Label } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import Sidebar from "@components/sidebar"
import { isNullObject } from "@src/utility/Utils"
import { useFormik } from "formik"

const AddJobCategoryForm = ({ open, toggleSidebar, formType, data }) => {
  const [isSubmit, setSubmit] = useState(false)

  const dispatch = useDispatch()

  // const jobCategories = useSelector(
  //   (state) => state.jobCategoryReducer.jobCategories
  // )

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue
  } = useFormik({
    initialValues: {
      name: ""
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Category Name is required")
    }),
    onSubmit: (values) => {
      if (formType === "edit" && values.name !== data.name) {
        dispatch(
          jobCategoryActions.updateJobCategoryRequest({
            params: data._id,
            body: {
              name: values.name
            }
          })
        )

        // for rerendering the table
        dispatch(jobCategoryActions.getAllJobCategoriesRequest())
      } else if (formType === "add") {
        dispatch(
          jobCategoryActions.createJobCategoryRequest({
            name: values.name
          })
        )

        // for rerendering the table
        dispatch(jobCategoryActions.getAllJobCategoriesRequest())
      }
      setSubmit(false)
      toggleSidebar()
    }
  })

  useEffect(() => {
    if (formType === "edit" && !isNullObject(data)) {
      setFieldValue("name", data.name)
    } else {
      setFieldValue("name", "")
    }
  }, [data])

  return (
    <Sidebar
      width={500}
      size="lg"
      open={open}
      title={`${formType === "edit" ? "Edit" : "Add"} Job Category`}
      headerClassName="mb-1"
      contentClassName="p-0"
      bodyClassName="pb-sm-0 pb-3"
      toggleSidebar={toggleSidebar}
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          setSubmit(true)
          handleSubmit()
        }}
      >
        <div className="mb-1">
          <Label for="invoice-from" className="form-label">
            Category Name*
          </Label>
          <Input
            type="text"
            name="name"
            onChange={handleChange}
            value={values.name}
            onBlur={handleBlur}
            id="invoice-from"
            placeholder=""
          />
          {isSubmit && errors.name && touched.name && (
            <div className="text-danger">{errors.name}</div>
          )}
        </div>

        <div className="d-flex flex-wrap mt-2">
          <Button
            type="submit"
            className="me-1"
            color="primary"
            // onClick={toggleSidebar}
          >
            Save
          </Button>
          <Button
            color="secondary"
            outline
            onClick={() => {
              toggleSidebar()
              setSubmit(false)
            }}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Sidebar>
  )
}

export default AddJobCategoryForm
