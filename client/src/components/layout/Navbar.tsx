import React, { FC } from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../store/store";
import { AuthState } from "../../store/@types/types";
import { logout } from "../../store/actions/actions";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "#fff",
  },
  button: {
    marginLeft: "auto",
  },
});

export const Navbar: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  const authState = useSelector<ApplicationState, AuthState>(
    (s) => s.authState
  );

  const { isAuthenticated, loading } = authState;

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Link to="/" className={classes.link}>
          <Typography variant="h6">∘ ○ 〇 Meet and Greet 〇 ○ ∘</Typography>
        </Link>
        {!loading && (
          <>
            {isAuthenticated ? (
              <Button
                className={classes.button}
                variant="outlined"
                color="secondary"
                onClick={() => logoutUser()}
              >
                {" "}
                Logout{" "}
              </Button>
            ) : (
              <div></div>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
