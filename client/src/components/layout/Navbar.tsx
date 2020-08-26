import React, { FC } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "#fff",
  },
});

export const Navbar: FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Link to="/" className={classes.link}>
          <Typography variant="h6">∘ ○ 〇 Meet and Greet 〇 ○ ∘</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
