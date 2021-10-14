import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../../api";
import Spinner from "../../common/spinner";
import EditForm from "../../ui/edit-form";

const EditUserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  return <>{user ? <EditForm user={user} /> : <Spinner />}</>;
};

export default EditUserPage;
