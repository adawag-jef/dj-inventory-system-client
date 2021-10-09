import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Loader from "./features/loader/Loader";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import PermissionPage from "./pages/permission";
import RegisterPage from "./pages/register";

const App: React.FC = (props) => {
  return (
    <Loader>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/permissions" component={PermissionPage} />
        </Switch>
      </Router>
    </Loader>
  );
};

export default App;
