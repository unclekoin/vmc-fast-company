import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../api";
import QualitiesList from "./qualities/qualities-list";
import CommentForm from "./comment-form";
import Comments from "./comments";
import Spinner from "../common/spinner";
import { useAuth } from "../../hooks/use-auth";
import { CommentsProvider } from "../../hooks/use-comments";

const UserCard = ({ user }) => {
  const [users, setUsers] = useState();
  const history = useHistory();
  const { currentUser } = useAuth();
  const [comments, setComments] = useState();
  const { _id, name, profession, rate, completedMeetings, image, qualities } = user;

  const handleClick = () => {
    history.push(history.location.pathname + "/edit");
  };

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
    api.comments.fetchCommentsForUser(_id).then((data) => setComments(data));
  }, []);

  const addComment = (comment) => {
    api.comments.add(comment);
    api.comments.fetchCommentsForUser(_id).then((data) => setComments(data));
  };

  const removeComment = (id) => {
    api.comments.remove(id);
    api.comments.fetchCommentsForUser(_id).then((data) => setComments(data));
  };

  return (
    <div className="row gutters-sm">
      <div className="col-md-4 mb-3">
        <div className="card mb-3">
          <div className="card-body">
            {currentUser._id === _id &&
              (<button
                onClick={ handleClick }
                className="position-absolute top-0 end-0 btn btn-sm"
              >
                <i className="bi bi-gear"></i>
              </button>)}
            <div className="d-flex flex-column align-items-center text-center position-relative">
              <img
                src={image}
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
              <span>????????????????</span>
            </h5>
            <p className="card-text">
              <QualitiesList qualityIds={qualities} />
            </p>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-body d-flex flex-column justify-content-center text-center">
            <h5 className="card-title">
              <span>?????????????????????? ??????????????</span>
            </h5>
            <h1 className="display-1">{completedMeetings}</h1>
          </div>
        </div>
      </div>
      <CommentsProvider>
        <div className="col-md-8">
          {users ? <CommentForm id={_id} users={users} add={addComment} /> : <Spinner />}
          { users && comments ? <Comments id={_id} users={users} comments={comments} remove={removeComment} /> : <Spinner />}
        </div>
      </CommentsProvider>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserCard;
