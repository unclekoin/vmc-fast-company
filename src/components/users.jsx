import React, { useState } from "react";
import PropTypes from "prop-types";
import User from "./user";
import TableHead from "./table-head";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

const Users = ({ users: allUsers, onDelete, onToggeleBookMark }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const length = allUsers.length;
  const pageSize = 4;

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const user = paginate(allUsers, currentPage, pageSize);

  const rows = user.map((user) => (
    <User
      key={user._id}
      {...user}
      onDelete={onDelete}
      onToggeleBookMark={onToggeleBookMark}
    />
  ));

  return (
    <div>
      {!!length && (
        <table className="table">
          <thead>
            <tr>
              <TableHead />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      )}
      <Pagination
        itemsCount={length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggeleBookMark: PropTypes.func.isRequired
};

export default Users;
