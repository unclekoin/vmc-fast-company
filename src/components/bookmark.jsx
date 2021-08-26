import React from 'react';

const BookMark = ({ onToggeleBookMark, id, status }) => {
  let classes = 'bi bi-bookmark';
  classes = status ? classes + '-star-fill' : classes;

  return (
    <button onClick={() => onToggeleBookMark(id)} type="button" className="btn btn-bookmark">
      <i className={classes} />
    </button>
  );
};

export default BookMark;
