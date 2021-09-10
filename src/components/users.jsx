import React, { useState, useEffect } from "react";
import api from "../api";
import PropTypes from "prop-types";
import User from "./user";
import TableHead from "./table-head";
import Pagination from "./pagination";
import GroupList from "./group-list";
import { paginate } from "../utils/paginate";
import SearchStatus from "./search-status";

const Users = ({ users: allUsers, onDelete, onToggeleBookMark }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 4;

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const filtredUsers = selectedProf
    ? allUsers.filter((user) => user.profession === selectedProf)
    : allUsers;

  const length = filtredUsers.length;

  const users = paginate(filtredUsers, currentPage, pageSize);

  const clearFilter = () => setSelectedProf();

  if (!users.length && currentPage) {
    handlePageChange(currentPage - 1);
  }

  const rows = users.map((user) => (
    <User
      key={user._id}
      {...user}
      onDelete={onDelete}
      onToggeleBookMark={onToggeleBookMark}
    />
  ));

  return (
    <>
      <SearchStatus length={length} />
      <div className="d-flex align-items-start">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 pe-4">
            <GroupList
              items={professions}
              selectedItem={selectedProf}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-3" onClick={clearFilter}>
              Отобразить всех
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
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
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggeleBookMark: PropTypes.func.isRequired
};

export default Users;
