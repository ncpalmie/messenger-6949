import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { useStyles } from "./styles";
import { register } from "../../store/utils/thunkCreators";

const Signup = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { user, register } = props;

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root}>
      <Box className={classes.header}>
        <Typography className={classes.switchText}>
          Already have an account?
        </Typography>
        <Button
          className={classes.loginButton}
          onClick={() => history.push("/login")}
        >
          Login
        </Button>
      </Box>
      <Box className={classes.form}>
        <Typography className={classes.welcomeText}>
          Create an account.
        </Typography>
        <form onSubmit={handleRegister}>
          <Grid>
            <Grid>
              <FormControl className={classes.inputFieldContainer}>
                <Typography className={classes.inputLabel}>Username</Typography>
                <TextField
                  aria-label="username"
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.inputFieldContainer}>
                <Typography className={classes.inputLabel}>
                  E-mail address
                </Typography>
                <TextField
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.inputFieldContainer}>
                <Typography className={classes.inputLabel}>Password</Typography>
                <TextField
                  aria-label="password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                />
              </FormControl>
            </Grid>
            <Box className={classes.formContainer}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                className={classes.formButton}
              >
                Create
              </Button>
            </Box>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
