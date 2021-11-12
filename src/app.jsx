import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/navbar";
import Users from "./layouts/users";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { ProfessionProvider } from "./hooks/use-profession";

const App = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <Switch>
          <ProfessionProvider>
            <Route path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
          </ProfessionProvider>
          <Route path="/" component={Main} />
        </Switch>
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
