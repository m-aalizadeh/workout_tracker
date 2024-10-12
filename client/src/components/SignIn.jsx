import { useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Visible from "./common/Visible";
import heart from "../source/heart.jpeg";
import { withStyles } from "tss-react/mui";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { commonFetch } from "../utils/services";

const styles = () => ({
  title: { fontStyle: "italic", color: "green" },
  error: { color: "red" },
});

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required.")
    .max(40, "Username must be 40 characters at most"),
  password: Yup.string()
    .required("Password is required.")
    .max(15, "Password must be 15 characters at most."),
});

const SignIn = ({ setSignIn, classes, history }) => {
  const [loader, setLoader] = useState(false);

  const submitForm = async (payload) => {
    setLoader(true);
    const result = await commonFetch("POST", "user/signin", undefined, payload);
    if (result?.token) {
      localStorage.setItem("user", JSON.stringify(result));
      history("/dashboard");
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
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            submitForm(values);
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
            <Form>
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
                    label="username"
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    required
                    fullWidth
                  />
                  <ErrorMessage
                    className={classes.error}
                    name="username"
                    component="div"
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
                  <ErrorMessage
                    className={classes.error}
                    name="password"
                    component="div"
                  />
                </Grid>
                <Grid item size={6}>
                  <Button variant="contained" fullWidth onClick={handleSubmit}>
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

SignIn.propTypes = {
  classes: PropTypes.object,
  setSignIn: PropTypes.func,
  history: PropTypes.func,
};

SignIn.defaultProps = {
  classes: {},
  setSignIn: () => {},
  history: () => {},
};

export default withStyles(SignIn, styles);
