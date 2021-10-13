import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ label, options, name, onChange, value }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      <label className="form-label d-block">{label}</label>
      {options.map((option) => (
        <div
          key={`${option.name}_${option.value}`}
          className="form-check form-check-inline"
        >
          <input
            className="form-check-input"
            onChange={handleChange}
            type="radio"
            name={name}
            checked={option.value === value}
            id={`${option.name}_${option.value}`}
            value={option.value}
          />
          <label
            className="form-check-label"
            htmlFor={`${option.name}_${option.value}`}
          >
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

RadioField.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default RadioField;
