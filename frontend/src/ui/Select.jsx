import PropTypes from 'prop-types';
import { Fragment } from 'react';
const Select = ({
  label,
  name,
  options,
  required = false
}) => {
  return (
    <div className="formGroup">
      {label && (
        < label className='form-label' >{label}</label>)
      }
      <div>
        {name && (
          <select
            id={name}
            name={name}
            required={required}
            className='select-control '

          >
            {options.map((option, i) => (
              <Fragment key={i}>
                <option key={i} value={option}>
                  {option}
                </option>
              </Fragment>

            ))}
          </select>)
        }
      </div>

    </div >)
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired, // Asegura que options sea un arreglo de objetos
  required: PropTypes.bool
}

export default Select;