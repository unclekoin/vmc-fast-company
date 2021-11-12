import React from "react";
import { useParams } from "react-router-dom";
import UserListPage from "../components/page/user-list-page";
import UserPage from "../components/page/user-page";
import EditUserPage from "../components/page/edit-user-page";
import UserProvider from "../hooks/use-users";

const Users = () => {
  const { userId, edit } = useParams();

  return (
    <>
      <UserProvider>
        {userId && edit ? <EditUserPage /> : userId ? <UserPage /> : <UserListPage />}
      </UserProvider>
    </>);
};

export default Users;
