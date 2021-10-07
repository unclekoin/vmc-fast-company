import React from "react";
import PropTypes from "prop-types";

const SearchPanel = ({ value, onChange }) => {
  return (
    <div className="input-group mb-3">
      <input
        onChange={onChange}
        type="text"
        className="form-control"
        placeholder="Search..."
        value={value}
      />
    </div>
  );
};

SearchPanel.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchPanel;
