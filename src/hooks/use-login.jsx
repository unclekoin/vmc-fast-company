import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { setTokens } from "../services/localstorage.service";

const httpLogin = axios.create();
const LoginContext = React.createContext();

export const useLogin = () => {
  return useContext(LoginContext);
};

const LoginProvider = ({ children }) => {
  const [error, setError] = useState(null);

  async function signIn({ email, password }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;

    try {
      const { data } = await httpLogin.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorObject = {};
        if (message === "EMAIL_NOT_FOUND") {
          errorObject.email =
            "Пользователя с такой электронной почтой не существует";
        }
        if (message === "INVALID_PASSWORD") {
          errorObject.password = "Неправильно введен пароль";
        }
        throw errorObject;
      }
    }
  }

  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [error]);

  const errorCatcher = (error) => {
    const { message, status } = error.response.data;
    setError({ message, status });
  };

  return (
    <LoginContext.Provider value={{ signIn }}>{children}</LoginContext.Provider>
  );
};

LoginProvider.propTypes = {
  children: PropTypes.node
};

export default LoginProvider;
