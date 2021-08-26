import React from 'react';
import BookMark from './bookmark';
import Quality from './quality';

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
      <td>{rate}/5</td>
      <td>
        <BookMark onToggeleBookMark={onToggeleBookMark} id={_id} status={status} />
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(_id)}>
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default User;
