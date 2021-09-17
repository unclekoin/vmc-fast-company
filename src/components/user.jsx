import React from "react";
import BookMark from "./bookmark";
import Quality from "./quality";
import PropTypes from "prop-types";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  onToggeleBookMark,
  status
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map(({ _id, ...rest }) => (
          <Quality key={_id} {...rest} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} / 5</td>
      <td className="text-center">
        <BookMark
          onToggeleBookMark={onToggeleBookMark}
          id={_id}
          status={status}
        />
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(_id)}>
          Удалить
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array.isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggeleBookMark: PropTypes.func.isRequired,
  status: PropTypes.bool
};

export default User;
