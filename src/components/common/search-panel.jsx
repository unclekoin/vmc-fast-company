import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const SearchPanel = ({ value, onChange }) => {
  const input = useRef();
  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <div className="input-group mb-3">
      <input
        ref={input}
        onChange={onChange}
        type="text"
        className="form-control"
        placeholder="Найти..."
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
