import React, { useState } from "react";
import api from "./api";
import Users from "./components/users";
import SearchStatus from "./components/search-status";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((state) => state.filter(({ _id }) => _id !== userId));
  };

  const hadnleToggleBookMark = (userId) => {
    const newUsers = [...users];
    const index = newUsers.findIndex((user) => user._id === userId);
    newUsers[index].status = !newUsers[index].status;
    setUsers(newUsers);
  };

  // const splitIntoPages = (currentPage) => {
  //   setUsers(users.slice(PAGE_SIZE * currentPage - PAGE_SIZE, PAGE_SIZE * currentPage))
  // }

  return (
    <div className="container mt-5">
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onToggeleBookMark={hadnleToggleBookMark}
      />
    </div>
  );
};

export default App;
