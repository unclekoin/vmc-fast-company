import React from 'react';

const BookMark = ({ onToggeleBookMark, id, status }) => {
  let classes = 'bi bi-bookmark';
  classes = status ? classes + '-star-fill' : classes;

  return (
    <span onClick={() => onToggeleBookMark(id)} className="bookmark-wrapper">
      <i className={classes} />
    </span>
  );
};

export default BookMark;
