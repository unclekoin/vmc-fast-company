import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import PropTypes from "prop-types";

const MultiSelectField = ({ label, name, options, defaultOption, onChange }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((key) => ({
        value: options[key]._id,
        label: options[key].name
      }))
      : options;

  const handleChange = (value) => {
    onChange({ name: name, value });
  };

  const animatedComponents = makeAnimated();

  return (
    <div className="mb-4">
      <label className="form-label d-block">{label}</label>
      <Select
        name={name}
        onChange={handleChange}
        placeholder={defaultOption}
        className="basic-multi-select"
        classNamePrefix="select"
        options={optionsArray}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
      />
    </div>
  );
};

MultiSelectField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  defaultOption: PropTypes.string,
  onChange: PropTypes.func
};

export default MultiSelectField;
