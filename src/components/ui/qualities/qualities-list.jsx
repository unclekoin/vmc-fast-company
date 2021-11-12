import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/use-qualities";

const QualitiesList = ({ qualityIds }) => {
  const { getQuality, isLoading } = useQualities();
  const qualities = getQuality(qualityIds);

  return (
    <>
      {!isLoading
        ? qualities.map(({ _id, ...rest }) => <Quality key={_id} {...rest} />)
        : "Loading..."}
    </>
  );
};

QualitiesList.propTypes = {
  qualityIds: PropTypes.array.isRequired
};

export default QualitiesList;
