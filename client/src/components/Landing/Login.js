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
  InputAdornment,
} from "@material-ui/core";
import { useStyles } from "./styles";
import { login } from "../../store/utils/thunkCreators";

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root}>
      <Box className={classes.header}>
        <Typography className={classes.switchText}>
          Don't have an account?
        </Typography>
        <Button
          className={classes.registerButton}
          onClick={() => history.push("/register")}
        >
          Create account
        </Button>
      </Box>
      <Box className={classes.form}>
        <Typography className={classes.welcomeText}>Welcome back!</Typography>
        <form onSubmit={handleLogin}>
          <Grid>
            <Grid>
              <FormControl
                margin="normal"
                required
                className={classes.inputFieldContainer}
              >
                <Typography className={classes.inputLabel}>
                  E-mail address
                </Typography>
                <TextField aria-label="username" name="username" type="text" />
              </FormControl>
            </Grid>
            <FormControl
              margin="normal"
              required
              className={classes.inputFieldContainer}
            >
              <Typography className={classes.inputLabel}>Password</Typography>
              <TextField
                aria-label="password"
                type="password"
                name="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography className={classes.forgotText}>
                        Forgot?
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Box className={classes.formContainer}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                className={classes.formButton}
              >
                Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
