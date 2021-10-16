import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../api/";
import { validator } from "../../utils/validator";
import TextAreaField from "../common/form/text-area-field";
import SelectField from "../common/form/select-field";

const CommentForm = ({ id }) => {
  const [data, setData] = useState({ comment: "", user: "" });
  const [users, setUsers] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    comment: {
      isRequired: {
        message: "Поле сообщение не может быть пустым"
      },
      min: {
        message: "Сообщение должно содержать не менее 3 символов",
        value: 3
      }
    },
    user: {
      isRequired: {
        message: "Выберите имя пользователя"
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const clear = () => {
    setData({ comment: "", user: "" });
  };

  const handleTextArea = () => {
    const isValid = validate();
    if (!isValid) return;
    const comment = {
      userId: data.user,
      pageId: id,
      content: data.comment
    };

    api.comments.add(comment);
    console.log(comment);
    clear();
  };

  return (
    <div className="card mb-2">
      <div className="card-body">
        <div>
          <h2>Новый комментарий</h2>
          <SelectField
            label=""
            defaultOption="Выбрать..."
            options={users}
            name="user"
            onChange={handleChange}
            value={data.user}
            error={errors.user}
          />
          <TextAreaField
            onChange={handleChange}
            label="Сообщение"
            name="comment"
            value={data.comment}
            error={errors.comment}
            rows="3"
          />
          <div className="d-flex justify-content-end">
            <button
              onClick={handleTextArea}
              className="btn btn-primary"
              disabled={!isValid}
            >
              Опубликовать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  id: PropTypes.string
};

export default CommentForm;
