import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, selectedItem, valueProperty, contentProperty, onItemSelect }) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map((key) => (
        <li
          key={items[key][valueProperty]}
          className={`list-group-item ${items[key] === selectedItem ? " active" : ""}`}
          onClick={() => onItemSelect(items[key])}
          role="button"
        >
          {items[key][contentProperty]}
        </li>
      ))}
    </ul>
  );
};

GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selectedItem: PropTypes.object,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func
};

export default GroupList;
