import React, { FC } from "react";
import {
  Grid,
  Card,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState } from "../../store/@types/types";
import { ApplicationState } from "../../store/store";
import { Dashboard } from "./dashboard/Dashboard";

const useStyles = makeStyles({
  root: {
    justifyContent: "stretch",
  },
  media: {
    height: "50vh",
  },
  buttons: {
    justifyContent: "space-around",
  },
  link: {
    textDecoration: "none",
  },
});

export const Landing: FC = () => {
  const classes = useStyles();
  const authState = useSelector<ApplicationState, AuthState>(
    (s) => s.authState
  );

  if (authState.isAuthenticated) {
    return <Route exact path="/" component={Dashboard} />;
  } else {
    return (
      <Grid item container direction="column">
        <Grid item sm={12}>
          <Card className={classes.root} square elevation={0}>
            <CardMedia
              className={classes.media}
              image="../../../assets/images/bg.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Join us!!
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Create your widespread group of network , with over 6,000
                people, spread across all continents
              </Typography>
            </CardContent>
            <CardActions className={classes.buttons}>
              <Link to="/register" className={classes.link}>
                <Button size="medium" color="secondary" variant="contained">
                  Register
                </Button>
              </Link>
              <Link to="/login" className={classes.link}>
                <Button size="medium" color="primary" variant="outlined">
                  Log In
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
};
