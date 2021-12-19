import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import { useQualities } from "../../hooks/use-qualities";
import { useProfessions } from "../../hooks/use-profession";
import { useAuth } from "../../hooks/use-auth";
import TextField from "../common/form/text-field";
import SelectField from "../common/form/select-field";
import RadioField from "../common/form/radio-field";
import MultiSelectField from "../common/form/multi-select-field";
import CheckboxField from "../common/form/checkbox-field";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    gender: "male",
    qualities: [],
    license: false
  });

  const { signUp } = useAuth();
  const { qualities } = useQualities();
  const qualitiesList = qualities.map((quality) => ({
    label: quality.name,
    value: quality._id
  }));
  const { professions } = useProfessions();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
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
        message: "Email введен некорректно"
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
        message: "Поле выбора профессии обязательно для заполнения"
      }
    },
    license: {
      isRequired: {
        message:
          "Вы не можете использовать сервис без подтверждения лицензионного соглашения"
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const modifiedData = {
      ...data,
      qualities: data.qualities.map((quality) => quality.value)
    };
    try {
      await signUp(modifiedData);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
        autoFocus
      />
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
        autoFocus
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
        options={qualitiesList}
        onChange={handleChange}
      />
      <CheckboxField
        onChange={handleChange}
        value={data.license}
        name="license"
        error={errors.license}
      >
        Подтвердить{" "}
        <a className="text-decoration-none" href="/">
          лицензионное соглашение
        </a>
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
