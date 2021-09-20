import React, { useState, useEffect } from "react";
import api from "../api";
import PropTypes from "prop-types";
import UsersTable from "./users-table";
import Pagination from "./pagination";
import GroupList from "./group-list";
import { paginate } from "../utils/paginate";
import SearchStatus from "./search-status";
import _ from "lodash";
import Spinner from "./spinner";

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 8;

  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    setUsers((state) => state.filter(({ _id }) => _id !== userId));
  };

  const hadnleToggleBookMark = (userId) => {
    const newUsers = [...users];
    const index = newUsers.findIndex((user) => user._id === userId);
    newUsers[index].bookmark = !newUsers[index].bookmark;
    setUsers(newUsers);
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handeleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    const filtredUsers = selectedProf
      ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
      : users;

    const length = filtredUsers.length;

    const sortedUsers = _.orderBy(filtredUsers, [sortBy.path], [sortBy.order]);

    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSelectedProf();
    };

    if (!usersCrop.length && currentPage) {
      handlePageChange(currentPage - 1);
    }

    return (
      <div>
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
              <UsersTable
                users={usersCrop}
                onDelete={handleDelete}
                onToggeleBookMark={hadnleToggleBookMark}
                selectedSort={sortBy}
                onSort={handeleSort}
              />
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
      </div>
    );
  }
  return (
    <Spinner />
  );
};

UserList.propTypes = {
  users: PropTypes.array,
  onDelete: PropTypes.func,
  onToggeleBookMark: PropTypes.func,
  getData: PropTypes.func
};

export default UserList;
