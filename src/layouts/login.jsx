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
            <h3 className="mb-4 text-center">Register</h3>
            <RegisterForm />
            <p>Already have account?
              <a onClick={toggleFormType} role="button"> Sign In</a>
            </p>
          </>
          : <>
            <h3 className="mb-4 text-center">Login</h3>
            <LoginForm />
            <p>Dont have account?
              <a onClick={toggleFormType} role="button"> Sign Up</a>
            </p>
          </>}
      </div>
    </div>
  );
};

export default Login;
