import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./../store";

import { Navbar } from "../components/layout/Navbar";
import { Landing } from "../components/pages/Landing";
import { Register } from "../components/pages/auth/Register";
import { Login } from "../components/pages/auth/Login";

const useStyles = makeStyles({
  header: {
    height: "10vh",
  },
  layout: {
    height: "90vh",
    padding: "2.5rem 3rem",
  },
});
export const Routes: FC = () => {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <Router>
        <Grid container direction="column">
          <Grid item className={classes.header}>
            <Navbar />
          </Grid>
          <Grid item container className={classes.layout}>
            <Route exact path="/" component={Landing} />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Grid>
        </Grid>
      </Router>
    </Provider>
  );
};
