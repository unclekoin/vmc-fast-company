import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import userService from "../services/user.service";

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(`${error.message}. Status: ${error.status}`);
      setError(null);
    }
  }, [error]);

  const errorCatcher = (error) => {
    const { message, status } = error.response.data;
    setError({ message, status });
    setIsLoading(false);
  };

  async function getUsers() {
    try {
      const { content } = await userService.get();
      setUsers(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }
  return (
    <UserContext.Provider value={{ users }}>
      {!isLoading ? children : "Loading..."}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf[PropTypes.node],
    PropTypes.node
  ])
};

export default UserProvider;
