import React, { FC, useState, FormEvent, ChangeEvent } from "react";
import {
  makeStyles,
  Grid,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Container,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import {
  authRequest,
  profileRequest,
  registerRequest,
  removeAlert,
  setAlert,
} from "../../../store/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { ApplicationState } from "../../../store/store";
import { AuthState } from "../../../store/@types/types";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "1rem",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Register: FC = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const authState = useSelector<ApplicationState, AuthState>(
    (s) => s.authState
  );

  const { isAuthenticated, token } = authState;

  if (isAuthenticated === true && token !== null) {
    return <Redirect to="/dashboard" />;
  }

  const { name, email, password, password2 } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      const id = nanoid();
      dispatch(setAlert(id, "Passwords don't match!", "error"));
      setTimeout(() => {
        dispatch(removeAlert(id));
      }, 5000);
    } else {
      dispatch(registerRequest(formData));
      dispatch(authRequest());
      dispatch(profileRequest());
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h3">
          Register
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e: FormEvent<HTMLFormElement>) => onSubmit(e)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={name}
                variant="outlined"
                required
                fullWidth
                name="name"
                label="Name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="email"
                label="Email Address"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                label="Password"
                type="password"
                name="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={password2}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                label="Confirm Password"
                type="password"
                name="password2"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" className={classes.link}>
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
