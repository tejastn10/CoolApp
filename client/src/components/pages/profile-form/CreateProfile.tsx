import {
  Button,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    paddingTop: "1rem",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const CreateProfile: FC = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    user: "Name",
    location: "",
    bio: "",
    jobstatus: "",
    hobbies: [],
    facebook: "",
    twitter: "",
    instagram: "",
  });

  const {
    user,
    location,
    bio,
    jobstatus,
    hobbies,
    facebook,
    twitter,
    instagram,
  } = formData;

  const currencies = [
    {
      value: "employed",
      label: "Employed",
    },
    {
      value: "student",
      label: "Student",
    },
  ];

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h3">
          Create Profile
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e: FormEvent<HTMLFormElement>) => onSubmit(e)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={user}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                size="small"
                name="user"
                label="User"
                helperText="Your Username, cannot be changed"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                name="location"
                label="Your Location"
                value={location}
                helperText="Add: City, State (e.g. Mumbai, Maharashtra)"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                size="small"
                fullWidth
                multiline
                name="bio"
                rowsMax={2}
                value={bio}
                helperText="Tell us about yourslef"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                label="Bio"
                type="text"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                size="small"
                value={jobstatus}
                helperText="Your Job Role"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                label="Job Status"
                name="jobstatus"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                name="hobbies"
                label="Your Hobbies"
                value={hobbies}
                helperText="use Comma seperated values"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
              />
            </Grid>
            <Grid item container spacing={1} alignItems="flex-end">
              <Grid item>
                <Facebook />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="FaceBook Link"
                  name="facebook"
                  value={facebook}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container spacing={1} alignItems="flex-end">
              <Grid item>
                <Twitter />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="Twitter Link"
                  name="twitter"
                  value={twitter}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container spacing={1} alignItems="flex-end">
              <Grid item>
                <Instagram />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="Instagram Link"
                  name="instagram"
                  value={instagram}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container spacing={1} alignItems="center">
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update Profile
              </Button>
            </Grid>
            <Grid item spacing={2}>
              <Link to="/dashboard" className={classes.link}>
                <Button
                  color="primary"
                  variant="outlined"
                  className={classes.submit}
                >
                  Go Back
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
