import React from "react";

const Spinner = () => {
  return (
    <div className="container mt-5">
      <span className="fs-2 me-2">Loading...</span>
      <span className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </span>
    </div>
  );
};

export default Spinner;
