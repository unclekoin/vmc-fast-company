import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, name, onChange, value }) => {
  return (
    <div>
      <h1>Radio Field</h1>
    </div>
  );
};

RadioField.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default RadioField;
