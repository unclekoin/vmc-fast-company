import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import NavProfile from "./nav-profile";

const NavBar = () => {
  const { currentUser } = useAuth();
  return (
    <nav className="navbar bg-light row gutters-sm mb-3 p-3">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              Главная
            </Link>
          </li>
          {currentUser && (
            <li className="nav-nav-item">
              <Link className="nav-link" to="/users">
                Пользователи
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {currentUser
            ? (
              <NavProfile />
            )
            : (
              <Link className="nav-link" to="/login">
              Авторизация
              </Link>
            )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
