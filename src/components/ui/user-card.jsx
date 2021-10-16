import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import QualitiesList from "./qualities/qualities-list";
import CommentForm from "./comment-form";
import Comments from "./comments";

const UserCard = ({ user }) => {
  const { _id, name, profession, rate, completedMeetings, qualities } = user;

  return (
    <div className="row gutters-sm">
      <div className="col-md-4 mb-3">
        <div className="card mb-3">
          <div className="card-body">
            <Link
              to={`/users/${_id}/edit`}
              className="position-absolute top-0 end-0 btn btn-sm"
            >
              <i className="bi bi-gear"></i>
            </Link>
            <div className="d-flex flex-column align-items-center text-center position-relative">
              <img
                src={`https://avatars.dicebear.com/api/avataaars/${(
                  Math.random() + 1
                )
                  .toString(36)
                  .substring(7)}.svg`}
                className="rounded-circle"
                width="150"
              />
              <div className="mt-3">
                <h4>{name}</h4>
                <p className="text-secondary mb-1">{profession.name}</p>
                <div className="text-muted">
                  <i
                    className="bi bi-caret-down-fill text-primary"
                    role="button"
                  ></i>
                  <i
                    className="bi bi-caret-up text-secondary"
                    role="button"
                  ></i>
                  <span className="ms-2">{rate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-body d-flex flex-column justify-content-center text-center">
            <h5 className="card-title">
              <span>Качества</span>
            </h5>
            <p className="card-text">
              <QualitiesList qualities={qualities} />
            </p>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-body d-flex flex-column justify-content-center text-center">
            <h5 className="card-title">
              <span>Завершенные встречи</span>
            </h5>
            <h1 className="display-1">{completedMeetings}</h1>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <CommentForm id={_id} />
        <Comments id={_id} />
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserCard;
