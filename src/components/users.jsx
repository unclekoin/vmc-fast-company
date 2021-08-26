import React from 'react';
import User from './user';
import TableHead from './table-head';

const Users = ({ users, onDelete, onToggeleBookMark }) => {
  const rows = users.map((user) => (
    <User
      key={user._id}
      {...user}
      onDelete={onDelete}
      onToggeleBookMark={onToggeleBookMark}
    />
  ));

  return (
    <div>
      {!!users.length && (
        <table className="table">
          <thead>
            <tr>
              <TableHead />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
