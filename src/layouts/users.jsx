import React from "react";
import { useParams } from "react-router-dom";
import UserListPage from "../components/page/user-list-page";
import UserPage from "../components/page/user-page";

const Users = () => {
  const { userId } = useParams();

  return <>{userId ? <UserPage /> : <UserListPage />}</>;
};

export default Users;
