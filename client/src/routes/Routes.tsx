import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { Navbar } from "../components/layout/Navbar";
import { Landing } from "../components/pages/Landing";

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
    <Grid container direction="column">
      <Grid item className={classes.header}>
        <Navbar />
      </Grid>
      <Grid item container className={classes.layout}>
        <Landing />
      </Grid>
    </Grid>
  );
};
