import React, { useState } from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(() => {
      
    })
  };

  const renderPhrase = (number) => {
    const tail = +String(number).slice(-1);
    const lastCouple = +String(number).slice(-2);

    const word =
      (lastCouple >= 10 && lastCouple < 20) || tail < 2 || tail > 4
        ? 'человек'
        : 'человека';

    return `${number} ${word} ${
      tail === 1 ? 'тусанет' : 'тусанут'
    } с тобой сегодня`;
  };

  const rows = users.map((row) => {
    return (
      <tr key={row._id}>
        <td>{row.name}</td>
        <td>
          {row.qualities.map((quality, index) => (
            <span
              key={row.qualities.length - index}
              className={`badge bg-${quality.color} me-2`}
            >
              {quality.name}
            </span>
          ))}
        </td>
        <td>{row.profession.name}</td>
        <td>{row.completedMeetings}</td>
        <td>{row.rate}/5</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="container mt-5">
      <h1 className="mb-4">
        <span className="badge bg-primary">{renderPhrase(users.length)}</span>
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default Users;
