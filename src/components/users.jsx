import React, { useState } from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((state) => {
      return state.filter(({ _id }) => _id !== userId);
    });
  };

  const renderPhrase = (number) => {
    if (!number) return 'Никто с тобой не тусонет';

    const tail = +String(number).slice(-1);
    const lastCouple = +String(number).slice(-2);

    const word =
      (lastCouple >= 10 && lastCouple < 20) || tail < 2 || tail > 4
        ? 'человек'
        : 'человека';

    return `${number} ${word} ${
      tail === 1 ? 'тусонет' : 'тусонут'
    } с тобой сегодня`;
  };

  const columnTitles = [
    'Имя',
    'Качества',
    'Профессия',
    'Встретился, раз',
    'Оценка',
    '',
  ];

  const tableHead = columnTitles.map((title, i) => (
    <th key={columnTitles.length - i} scope="col">
      {title}
    </th>
  ));

  const rows = users.map(
    ({ _id, name, profession, qualities, completedMeetings, rate }) => (
        <tr key={_id}>
          <td>{name}</td>
          <td>
            {qualities.map(({ _id, name, color }) => (
              <span key={_id} className={`badge bg-${color} me-2`}>
                {name}
              </span>
            ))}
          </td>
          <td>{profession.name}</td>
          <td>{completedMeetings}</td>
          <td>{rate}/5</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(_id)}
            >
              Delete
            </button>
          </td>
        </tr>
      )
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">
        <span className={`badge ${users.length ? 'bg-primary' : 'bg-danger'}`}>
          {renderPhrase(users.length)}
        </span>
      </h1>
      {(users.length || null) && (
        <table className="table">
          <thead>
            <tr>{tableHead}</tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
