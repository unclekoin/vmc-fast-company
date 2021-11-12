import React from "react";
import PropTypes from "prop-types";
import { useProfessions } from "../../hooks/use-profession";

const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfessions();
  const profession = getProfession(id);

  return <>{!isLoading ? profession.name : "Loading..."}</>;
};

Profession.propTypes = {
  id: PropTypes.string.isRequired
};

export default Profession;
