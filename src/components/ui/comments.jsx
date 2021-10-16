import React, { useEffect, useState } from "react";
import api from "../../api";
import PropTypes from "prop-types";
import Comment from "./comment";
import Spinner from "../common/spinner";

const Comments = ({ id }) => {
  const [comments, setComments] = useState();
  const [users, setUsers] = useState();
  const [modifiedComments, setModifiedComments] = useState();

  useEffect(() => {
    api.comments.fetchCommentsForUser(id).then((data) => setComments(data));
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleComments = () => {
    return comments.map((comment) => ({
      _id: comment._id,
      content: comment.content,
      date: comment.created_at,
      author: users.find((user) => user._id === comment.userId).name
    }));
  };

  useEffect(() => {
    if (comments && users) setModifiedComments(handleComments());
  }, [comments, users]);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Комментарии</h2>
        <hr />
        {modifiedComments ? (modifiedComments.map((comment) => <Comment key={comment._id} comment={comment} />)) : <Spinner />}
      </div>
    </div>
  );
};

Comments.propTypes = {
  id: PropTypes.string
};

export default Comments;
