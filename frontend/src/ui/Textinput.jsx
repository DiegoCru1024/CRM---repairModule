import React from 'react';

const TextInput = ({
                       label,
                       name,
                       value,
                       type = "text",
                       placeholder,
                       onChange,
                       readOnly = true,
                       required = true,
                   }) => {

    return (
        <div className='formGroup'>
            {label && (
                <label className='form-label'>{label}</label>
            )
            }
            <div>
                {name && (
                    <input
                        type={type}
                        name={name}
                        value={value}
                        readOnly={readOnly}
                        required={required}
                        onChange={onChange}
                        placeholder={placeholder}
                        className='form-control'/>
                )
                }
            </div>
        </div>)
}

export default TextInput;