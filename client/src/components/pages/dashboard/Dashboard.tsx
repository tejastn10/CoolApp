import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthState, ProfileState } from "../../../store/@types/types";
import { profileRequest } from "../../../store/actions/actions";
import { ApplicationState } from "../../../store/store";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
}));

export const Dashboard: FC = () => {
  const classes = useStyles();
  const profileState = useSelector<ApplicationState, ProfileState>(
    (s) => s.profileState
  );
  const authState = useSelector<ApplicationState, AuthState>(
    (s) => s.authState
  );
  const { user } = authState;
  const { loading, profile } = profileState;
  if (profile === null) {
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileRequest());
  }, [dispatch]);

  return loading && profile === null ? (
    <>Loading</>
  ) : (
    <Grid
      container
      spacing={1}
      direction="column"
      justify="center"
      alignItems="flex-start"
    >
      <Grid item xs={2} sm={2}>
        <h1>Dashboard</h1>
      </Grid>
      <Grid item xs={2} sm={2}>
        <h3>Welcome {user && user.name}</h3>
      </Grid>
      {profileState.profile !== null ? (
        <>Has</>
      ) : (
        <Grid item container xs={6} direction="column">
          <Grid item xs={12} spacing={1}>
            You have not created a profile, Please create a profile
          </Grid>
          <Link to="/create-profile" className={classes.link}>
            <Button variant="contained" color="primary">
              Create Profile
            </Button>
          </Link>
        </Grid>
      )}
    </Grid>
  );
};
