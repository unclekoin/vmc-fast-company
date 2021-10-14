import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import QualitiesList from "./qualities/qualities-list";

const UserCard = ({ user }) => {
  const { _id, name, profession, rate, completedMeetings, qualities } = user;
  return (
    <div className="card">
      <h5 className="card-header">
        Имя: <span className="fs-2">{name}</span>
      </h5>
      <div className="card-body">
        <div className="mb-2">
          <QualitiesList qualities={qualities} />
        </div>
        <h5 className="card-title">
          Профессия: <span className="fs-2">{profession.name}</span>
        </h5>
        <p className="card-text mb-1">
          Встретился, раз: <span className="fs-3">{completedMeetings}</span>
        </p>
        <p className="card-text">
          Оценка: <span className="fs-3">{rate} / 5</span>
        </p>
        <Link to={`/users/${_id}/edit`} className="btn btn-primary">
          Изменить
        </Link>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserCard;
