import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/navbar";
import Users from "./layouts/users";
import Main from "./layouts/main";
import Login from "./layouts/login";
import LogOut from "./layouts/logout";
import { ProfessionProvider } from "./hooks/use-profession";
import { QualityProvider } from "./hooks/use-qualities";
import { AuthProvider } from "./hooks/use-auth";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protected-route";

const App = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <div className="container">
          <ProfessionProvider>
            <QualityProvider>
              <Switch>
                <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/logout" component={LogOut} />
                <Route path="/" component={Main} />
                <Redirect to="/" />
              </Switch>
            </QualityProvider>
          </ProfessionProvider>
        </div>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
