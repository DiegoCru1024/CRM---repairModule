import React from 'react';
const Textinput = ({
  label,
  name,
  type = "text",
  readOnly = false,
  required = false,
}) => {

  return (
    <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
      {label && (
        <label >{label}</label>
      )}

      <input type={type} name={name} readOnly={readOnly} required={required} />
    </div>)
}

export default Textinput;