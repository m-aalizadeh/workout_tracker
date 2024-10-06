import { useState } from "react";
import * as yup from "yup";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Visible from "./common/Visible";
import heart from "../source/heart.jpeg";
import { withStyles } from "tss-react/mui";
import { Formik, Field, Form } from "formik";
import { commonFetch } from "../utils/services";

const styles = () => ({ title: { fontStyle: "italic", color: "green" } });

const signInValidation = () => {
  return yup.object().shape({
    username: yup
      .string()
      .required("Email/Username is required.")
      .max(40, "Email/Username must be 40 characters at most"),
    password: yup
      .string()
      .required("Password is required.")
      .max(15, "Password must be 15 characters at most."),
  });
};

const SignIn = ({ setSignIn, classes }) => {
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (values) => {
    console.log(values);
    setLoader(true);
    const result = await commonFetch("POST", "user/signin", undefined, values);
    if (result?.token) {
      localStorage.setItem("user", result);
    }
    setLoader(false);
  };

  const createNewUser = () => {
    setSignIn(false);
  };

  return (
    <Grid container mt={8} spacing={4} justifyContent="center">
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid>
          <img
            src={heart}
            style={{ width: 50, height: 50 }}
            alt="Workout Tracker"
          />
        </Grid>
        <Grid>
          <Typography className={classes.title}>Workout Tracker</Typography>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={signInValidation()}
        >
          {({ handleBlur, handleChange, values }) => (
            <Form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
              >
                <Grid size={6}>
                  <Field
                    as={TextField}
                    type="text"
                    label="username/email"
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid size={6}>
                  <Field
                    as={TextField}
                    type="password"
                    label="password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item size={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleSubmit(values)}
                  >
                    <Typography>Login</Typography>
                    <Visible when={loader}>
                      <CircularProgress color="secondary" size={24} />
                    </Visible>
                  </Button>
                </Grid>
                <Grid size={6} align="center">
                  <Typography variant="body">
                    New to workout-tracker?
                  </Typography>
                  <Link onClick={createNewUser}>Create one</Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default withStyles(SignIn, styles);
