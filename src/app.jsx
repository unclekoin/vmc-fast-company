import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/navbar";
import Users from "./layouts/users";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { ProfessionProvider } from "./hooks/use-profession";
import { QualityProvider } from "./hooks/use-qualities";
import AuthProvider from "./hooks/use-auth";
import LoginProvider from "./hooks/use-login";

const App = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <div className="container">
          <ProfessionProvider>
            <QualityProvider>
              <LoginProvider>
                <Switch>
                  <Route path="/users/:userId?/:edit?" component={Users} />
                  <Route path="/login/:type?" component={Login} />
                  <Route path="/" component={Main} />
                </Switch>
              </LoginProvider>
            </QualityProvider>
          </ProfessionProvider>
        </div>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
