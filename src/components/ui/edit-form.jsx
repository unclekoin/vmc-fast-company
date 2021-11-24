import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../api/index";
import { validator } from "../../utils/validator";
import TextField from "../common/form/text-field";
import SelectField from "../common/form/select-field";
import RadioField from "../common/form/radio-field";
import MultiSelectField from "../common/form/multi-select-field";

const EditForm = ({ user }) => {
  const history = useHistory();
  const [data, setData] = useState({
    name: user.name,
    email: user.email || "",
    profession: user.profession._id,
    gender: user.gender || "male",
    qualities: user.qualities.map((quality) => ({
      value: quality._id,
      label: quality.name
    }))
  });

  const [qualities, setQualities] = useState();
  const [professions, setProfessions] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя обязателено для заполнения"
      },
      min: {
        message: "Имя должно содержать не менее 3 символов",
        value: 3
      }
    },
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен не корректно"
      }
    },
    profession: {
      isRequired: {
        message: "Пoле выбора профессии обязателено для заполнения"
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const [profession] = professions.filter(
      (profession) => profession._id === data.profession
    );
    const qualityIds = data.qualities.map((quality) => quality.value);
    const updatedQualities = Object.values(qualities).filter((quality) =>
      qualityIds.includes(quality._id)
    );
    const updatedData = { ...data, profession, qualities: updatedQualities };
    api.users.update(user._id, updatedData);

    history.goBack();
  };

  return (
    <>
      <button
        onClick={() => history.goBack()}
        className="btn btn-primary pe-4"
        disabled={!professions}
      >
        <i className="bi bi-caret-left"></i>Назад
      </button>
      <h3 className="mb-4 text-center">Редактировать данные</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Имя"
          name="name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
        />
        <TextField
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />
        <SelectField
          label="Выберите профессию"
          defaultOption="Выбрать..."
          options={professions}
          onChange={handleChange}
          value={data.profession}
          error={errors.profession}
        />
        <RadioField
          label="Выберите пол"
          options={[
            { name: "Мужской", value: "male" },
            { name: "Женский", value: "female" },
            { name: "Другое", value: "other" }
          ]}
          value={data.gender}
          name="gender"
          onChange={handleChange}
        />
        <MultiSelectField
          name="qualities"
          label="Выберите качества"
          defaultOption="Выбрать..."
          defaultValue={data.qualities}
          options={qualities}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="btn btn-primary w-100 mx-auto"
          disabled={!isValid || !professions}
        >
          Обновить
        </button>
      </form>
    </>
  );
};

EditForm.propTypes = {
  user: PropTypes.object
};

export default EditForm;
