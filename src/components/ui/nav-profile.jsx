import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

const NavProfile = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <img
          src={currentUser.image}
          alt=""
          className="img-responsive rounded-circle"
          height="40"
        />
      </div>
      <div className={`w-100 dropdown-menu ${isOpen ? "show" : ""}`}>
        <Link className="dropdown-item" to={`/users/${currentUser._id}`}>
          Профиль
        </Link>
        <Link className="dropdown-item" to="/logout">
          Выход из системы
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
