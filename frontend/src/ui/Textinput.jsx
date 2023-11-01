import React from 'react';
const Textinput = ({
  label,
  name,
  type = "text",
  placeholder,
  readOnly = false,
  required = false,
}) => {

  return (
    <div className='formGroup'>
      {label && (
        <label className='form-label' >{label}</label>
      )
      }
      <div >
        {name && (
          <input
            type={type}
            name={name}
            readOnly={readOnly}
            required={required}
            placeholder={placeholder}
            className='form-control' />
        )
        }
      </div>
    </div >)
}

export default Textinput;