import React, { useState, useEffect } from "react";
import api from "../../api";
import { validator } from "../../utils/validator";
import TextField from "../common/form/text-field";
import SelectField from "../common/form/select-field";
import RadioField from "../common/form/radio-field";
import MultiSelectField from "../common/form/multi-selct-field";
import CheckboxField from "../common/form/checkbox-field";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    gender: "male",
    qualities: [],
    licence: false
  });
  const [qualities, setQualities] = useState({});
  const [professions, setProfessions] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));

    return () => {
      setProfessions();
      setQualities({});
    };
  }, []);

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен не корректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одну цифру"
      },
      min: {
        message: "Пароль должен содержать не менее 8 символов",
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: "Пoле выбора профессии обязателено для заполнения"
      }
    },
    licence: {
      isRequired: {
        message: "Вы не можете использовать сервис без подтверждения лицензионного соглащения"
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
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label="Выберите профессию"
        defaultOption="Выбрать..."
        name="profession"
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
        options={qualities}
        onChange={handleChange}
      />
      <CheckboxField
        onChange={handleChange}
        value={data.licence}
        name="licence"
        error={errors.licence}
      >
        Подтвердить <a className="text-decoration-none" href="/">лицензионное соглашение</a>
      </CheckboxField>
      <button
        type="submit"
        className="btn btn-primary w-100 mx-auto"
        disabled={!isValid}
      >
        Отправить
      </button>
    </form>
  );
};

export default RegisterForm;
