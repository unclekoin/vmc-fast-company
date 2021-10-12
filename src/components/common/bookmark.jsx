import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ onToggeleBookMark, id, status }) => {
  let classes = "bi bi-bookmark";
  classes = status ? classes + "-star-fill" : classes;

  return (
    <span onClick={() => onToggeleBookMark(id)} className="fs-4 text-danger" role="button">
      <i className={classes} />
    </span>
  );
};

BookMark.propTypes = {
  onToggeleBookMark: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  status: PropTypes.bool
};

export default BookMark;
