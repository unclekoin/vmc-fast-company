import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/vmc-fast-company/">
          Main
        </Link>
      </li>
      <li className="nav-nav-item">
        <Link className="nav-link" to="/vmc-fast-company/users">
          Users
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/vmc-fast-company/login">
          Login
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;
