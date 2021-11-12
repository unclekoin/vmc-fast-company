import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ onToggleBookMark, id, status }) => {
  let classes = "bi bi-bookmark";
  classes = status ? classes + "-fill" : classes;

  return (
    <span onClick={() => onToggleBookMark(id)} className="fs-4 text-danger" role="button">
      <i className={classes} />
    </span>
  );
};

BookMark.propTypes = {
  onToggleBookMark: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  status: PropTypes.bool
};

export default BookMark;
