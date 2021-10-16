import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="row gutters-sm p-3">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">
            Главная
          </Link>
        </li>
        <li className="nav-nav-item">
          <Link className="nav-link" to="/users">
            Пользователи
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Авторизация
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
