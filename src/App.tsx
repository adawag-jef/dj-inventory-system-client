import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loader from "./features/loader/Loader";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

interface IAppProps {}

const App: React.FC<IAppProps> = (props) => {
  return (
    <Loader>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </Router>
    </Loader>
  );
};

export default App;
