import React, { FC, useState, ChangeEvent, FormEvent } from "react";
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
  loginRequest,
  profileRequest,
} from "../../../store/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store/store";
import { AuthState } from "../../../store/@types/types";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

export const Login: FC = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const authState = useSelector<ApplicationState, AuthState>(
    (s) => s.authState
  );

  const { isAuthenticated, token } = authState;

  if (isAuthenticated === true && token !== null) {
    return <Redirect to="/dashboard" />;
  }

  const { email, password } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginRequest({ email, password }));
    dispatch(authRequest());
    dispatch(profileRequest());
    console.log("Success");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h3">
          Log in
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e: FormEvent<HTMLFormElement>) => onSubmit(e)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={email}
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to="/register" className={classes.link}>
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
