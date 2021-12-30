import React from "react";
import { useParams } from "react-router-dom";
import UserCard from "../../ui/user-card";
import Spinner from "../../common/spinner";
import { useUser } from "../../../hooks/use-users";

const UserPage = () => {
  const { getUserById } = useUser();
  const { userId } = useParams();
  const user = getUserById(userId);

  return <>{user ? <UserCard user={user} /> : <Spinner />}</>;
};

export default UserPage;
