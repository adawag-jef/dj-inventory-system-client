/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { verifyCurrentUser } from "./features/auth/authSlice";
import Loader from "./features/loader/Loader";
import AuthenticatedRoute from "./hoc/AdminRoute";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import PasswordReset from "./pages/password-reset";
import PermissionPage from "./pages/permission";
import RegisterPage from "./pages/register";
import RequestResetPassword from "./pages/request-reset-password";
import UserPage from "./pages/user";

const App: React.FC = (props) => {
  const dispatch = useAppDispatch();
  // const { status, isAuthenticated } = useAppSelector(selectAuth);

  React.useEffect(() => {
    const token = localStorage.getItem("refresh_token");
    if (token) {
      dispatch(verifyCurrentUser({ token }));
    }
  }, []);

  return (
    <Loader>
      <Router>
        <Switch>
          <AuthenticatedRoute exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route
            exact
            path="/request-reset-password"
            component={RequestResetPassword}
          />
          <Route
            exact
            path="/password-reset/:uidb64/:token"
            component={PasswordReset}
          />
          <AuthenticatedRoute exact path="/users" component={UserPage} />
          <AuthenticatedRoute
            exact
            path="/permissions"
            component={PermissionPage}
          />
        </Switch>
      </Router>
    </Loader>
  );
};

export default App;
