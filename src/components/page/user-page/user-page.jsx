import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";
import UserCard from "../../ui/user-card";
import Spinner from "../../common/spinner";

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(userId).then((user) => setUser(user));
  }, []);

  return <>{user ? <UserCard user={user}/> : <Spinner />}</>;
};

export default UserPage;
