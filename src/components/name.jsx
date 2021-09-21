import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Name = ({ name, id }) => {
  return <Link to={`/vmc-fast-company/users/${id}`}>{name}</Link>;
};

Name.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default Name;
