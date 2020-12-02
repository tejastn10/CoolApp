import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { AuthState } from "../../store/@types/types";
import { ApplicationState } from "../../store/store";

interface Props {
  component: any;
  exact: boolean;
  path: string;
}

export function PrivateRoute({ component: Component, ...rest }: Props) {
  const authState = useSelector<ApplicationState, AuthState>(
    (s) => s.authState
  );

  const { isAuthenticated, loading } = authState;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
