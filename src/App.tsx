/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { verifyCurrentUser } from "./features/auth/authSlice";
import Loader from "./features/loader/Loader";
import AuthenticatedRoute from "./hoc/AdminRoute";
import UnAuthenticatedRoute from "./hoc/UnAuthenticatedRoute";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import PasswordReset from "./pages/password-reset";
import PermissionPage from "./pages/permission";
import RegisterPage from "./pages/register";
import RequestResetPassword from "./pages/request-reset-password";
import RolePage from "./pages/role";
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
          <UnAuthenticatedRoute exact path="/login" component={LoginPage} />
          <UnAuthenticatedRoute
            exact
            path="/register"
            component={RegisterPage}
          />
          <UnAuthenticatedRoute
            exact
            path="/request-reset-password"
            component={RequestResetPassword}
          />
          <UnAuthenticatedRoute
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
          <AuthenticatedRoute exact path="/roles" component={RolePage} />
        </Switch>
      </Router>
    </Loader>
  );
};

export default App;
