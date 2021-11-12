import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import professionService from "../services/profession.service";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
  return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [professions, setProfessions] = useState([]);
  const [error, setError] = useState(null);
  console.log(professions);

  useEffect(() => {
    getProfessionsList();
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

  async function getProfessionsList() {
    try {
      const { content } = await professionService.get();
      setProfessions(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  const getProfession = (id) => {
    return professions.find((p) => p._id === id);
  };

  return (
    <ProfessionContext.Provider value={{ isLoading, professions, getProfession }}>
      {children}
    </ProfessionContext.Provider>
  );
};

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf[PropTypes.node],
    PropTypes.node
  ])
};
