import React, { useState } from "react";
import api from "./api";
import Users from "./components/users";

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

  return (
    <div className="container mt-5">
      <Users
        users={users}
        onDelete={handleDelete}
        onToggeleBookMark={hadnleToggleBookMark}
      />
    </div>
  );
};

export default App;
