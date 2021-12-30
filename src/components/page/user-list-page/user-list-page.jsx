import React, { useState, useEffect } from "react";
import UsersTable from "../../ui/users-table";
import Pagination from "../../common/pagination";
import GroupList from "../../common/group-list";
import { paginate } from "../../../utils/paginate";
import SearchStatus from "../../ui/search/search-status";
import _ from "lodash";
import Spinner from "../../common/spinner";
import SearchPanel from "../../common/search-panel";
import { useUser } from "../../../hooks/use-users";
import { useAuth } from "../../../hooks/use-auth";
import { useProfessions } from "../../../hooks/use-profession";

const UserListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { currentUser } = useAuth();
  const { isLoading: professionsLoading, professions } = useProfessions();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 8;
  const { users } = useUser();

  const handleDelete = (userId) => {
    // setUsers((state) => state.filter(({ _id }) => _id !== userId));
    console.log(userId);
  };

  const handleToggleBookMark = (userId) => {
    const newArray = [...users];
    const index = newArray.findIndex((user) => user._id === userId);
    newArray[index].bookmark = !newArray[index].bookmark;
    // setUsers(newArray);
    console.log(newArray);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const handleProfessionSelect = (item) => {
    setSearchQuery("");
    setSelectedProf(item);
  };

  const handleSearchQuery = ({ target }) => {
    setSelectedProf();
    setSearchQuery(target.value);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const clearFilter = () => {
    setSelectedProf();
    setSearchQuery("");
  };

  if (users) {
    const filterUsers = (data) => {
      const filteredUsers = searchQuery
        ? data.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : selectedProf
          ? data.filter(
            (user) =>
              JSON.stringify(user.profession) === JSON.stringify(selectedProf)
          )
          : data;

      return filteredUsers.filter((user) => user._id !== currentUser._id);
    };

    const filteredUsers = filterUsers(users);

    const length = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    if (!usersCrop.length && currentPage) {
      handlePageChange(currentPage - 1);
    }

    return (
      <div className="d-flex align-items-start">
        {professions && !professionsLoading && (
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
        <div>
          <SearchStatus length={length} />
          <SearchPanel value={searchQuery} onChange={handleSearchQuery} />
          <div className="d-flex flex-column">
            {!!length && (
              <UsersTable
                users={usersCrop}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
                selectedSort={sortBy}
                onSort={handleSort}
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
  return <Spinner />;
};

export default UserListPage;
