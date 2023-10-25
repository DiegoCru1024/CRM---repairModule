import React from 'react';
const InputGroup = ({
  name,
  label,
  append,
  type = "text",
  required = false,
  placeholder,
}) => {
  return (
    <div>
      {label && (
        <label className='form-label' >{label}</label>
      )
      }
      <div className={`inputGroup ${append ? "has-append" : " "}`}>
        <div style={{ position: "relative" }}>
          {name && (
            <input
              type={type}
              name={name}
              required={required}
              placeholder={placeholder}
              className='input-group-control'
            />

          )
          }
        </div>
        {/*append */}
        {append &&
          <span class="append-slot input-group-addon right">
            <div className="input-group-text">{append}</div>
          </span>}
      </div>
    </div >
  )
}
export default InputGroup;