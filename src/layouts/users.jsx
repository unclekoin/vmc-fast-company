import React from "react";
import { useParams } from "react-router-dom";
import UserListPage from "../components/page/user-list-page";
import UserPage from "../components/page/user-page";
import EditUserPage from "../components/page/edit-user-page";

const Users = () => {
  const { userId, edit } = useParams();

  return <>{userId && edit ? <EditUserPage /> : userId ? <UserPage /> : <UserListPage />}</>;
};

export default Users;
