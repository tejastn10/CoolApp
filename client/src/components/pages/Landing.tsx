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
});

export const Landing: FC = () => {
  const classes = useStyles();

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
              Create your widespread group of network , with over 6,000 people,
              spread across all continents
            </Typography>
          </CardContent>
          <CardActions className={classes.buttons}>
            <Button size="medium" color="secondary" variant="contained">
              Register
            </Button>
            <Button size="medium" color="primary" variant="outlined">
              Log In
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
