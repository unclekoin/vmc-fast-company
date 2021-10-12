import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/text-field";

const LoginForm = () => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({ email: "", password: "" });

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = ({ target }) => {
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
    <div className="row m-5">
      <div className="col-md-6 offset-md-3 p-5 shadow">
        <h3 className="mb-4 text-center">Login</h3>
        <form className="pb-5" onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="btn btn-primary w-100 mx-auto"
            disabled={!isValid}
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
