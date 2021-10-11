import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../features/auth/authSlice";

interface IAuthenticatedRouteProps extends RouteProps {}

const UnAuthenticatedRoute = (props: IAuthenticatedRouteProps) => {
  const { isAuthenticated, status } = useAppSelector(selectAuth);
  const { component: Component, ...rest } = props;
  if (!Component) return null;
  if (status === "loading") {
    return <h2>Loading</h2>;
  }
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
