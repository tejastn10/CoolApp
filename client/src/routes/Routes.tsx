import React, { FC, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import { ApplicationState, configureAppStore } from "../store/store";

import { Navbar } from "../components/layout/Navbar";
import { Landing } from "../components/pages/Landing";
import { Register } from "../components/pages/auth/Register";
import { Login } from "../components/pages/auth/Login";
import { alertInitialState } from "../store/reducers/alert";
import { AlertComponent as Alert } from "../components/layout/Alert";
import { authInitialState } from "../store/reducers/auth";
import { setAuthToken } from "../utils/setAuthToken";
import { authRequest } from "../store/actions/auth";
import { Dashboard } from "../components/pages/dashboard/Dashboard";
import { profileInitialState } from "../store/reducers/profile";
import { profileRequest } from "../store/actions/actions";
import { PrivateRoute } from "./private/PrivateRoute";

const initialState: ApplicationState = {
  alertState: alertInitialState,
  authState: authInitialState,
  profileState: profileInitialState,
};
const store = configureAppStore(initialState);

const useStyles = makeStyles({
  header: {
    height: "10vh",
  },
  layout: {
    height: "90vh",
    padding: "2.5rem 3rem",
  },
});

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export const Routes: FC = () => {
  const classes = useStyles();

  useEffect(() => {
    store.dispatch(authRequest());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Grid container direction="column">
          <Grid item className={classes.header}>
            <Navbar />
          </Grid>
          <Alert />
          {store.getState().authState.isAuthenticated ? (
            <Route exact path="/dashboard" component={Dashboard} /> &&
            store.dispatch(authRequest()) &&
            store.dispatch(profileRequest())
          ) : (
            <Grid item container className={classes.layout}>
              <Route exact path="/" component={Landing} />
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </Grid>
          )}
        </Grid>
      </Router>
    </Provider>
  );
};
