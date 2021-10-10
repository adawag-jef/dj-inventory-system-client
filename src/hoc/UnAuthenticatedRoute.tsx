import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../features/auth/authSlice";

interface IAuthenticatedRouteProps extends RouteProps {}

const UnAuthenticatedRoute = (props: IAuthenticatedRouteProps) => {
  const { isAuthenticated } = useAppSelector(selectAuth);
  const { component: Component, ...rest } = props;
  if (!Component) return null;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !isAuthenticated ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default UnAuthenticatedRoute;
