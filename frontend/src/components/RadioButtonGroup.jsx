// import React from "react"

import { Input, Label } from "reactstrap"

const RadioButtonGroup = ({ name, options, value, onChange }) => {
  return (
    <div className="demo-inline-spacing">
      {options.map((option, index) => (
        <div className="form-check" key={index}>
          <Label className="form-check-label">
            <Input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
            />
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  )
}

export default RadioButtonGroup
