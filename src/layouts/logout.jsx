import React, { useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import Spinner from "../components/common/spinner";

const LogOut = () => {
  const { LogOut } = useAuth();
  useEffect(() => {
    LogOut();
  }, []);
  return <Spinner />;
};

export default LogOut;
