import React, { useState } from "react";
import { useParams } from "react-router";
import LoginForm from "../components/ui/login-form";
import RegisterForm from "../components/ui/register-form";

const Login = () => {
  const { type } = useParams();
  const [formtype, setFormType] = useState(
    type === "register" ? type : "login"
  );

  const toggleFormType = () => {
    setFormType((prevState) => prevState === "register" ? "login" : "register");
  };

  return (
    <div className="row">
      <div className="col p-5">
        {formtype === "register"
          ? <>
            <h3 className="mb-4 text-center">Регистрация</h3>
            <RegisterForm />
            <p className="py-2">Уже есть аккаунт?
              <a className="text-primary text-decoration-none" onClick={toggleFormType} role="button"> Войти</a>
            </p>
          </>
          : <>
            <h3 className="mb-4 text-center">Войти в систему</h3>
            <LoginForm />
            <p className="py-2">Еще нет аккаунта?
              <a className="text-primary text-decoration-none" onClick={toggleFormType} role="button"> Зарегистрироваться</a>
            </p>
          </>}
      </div>
    </div>
  );
};

export default Login;
