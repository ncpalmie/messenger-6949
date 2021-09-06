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
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    flex: "2",
    height: "fit-content",
  },
  header: {
    display: "flex",
    height: "fit-content",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 50,
  },
  form: {
    display: "flex",
    height: "fit-content",
    width: "100%",
    flexDirection: "column",
    marginLeft: 160,
    marginTop: 80,
  },
  registerButton: {
    width: "fit-content",
    whiteSpace: "nowrap",
    padding: "20px 50px 20px 50px",
    color: "#3A8DFF",
    boxShadow: "0px 0px 12px 1px #DCDCDC",
    fontSize: 20,
  },
  registerText: {
    marginRight: 35,
    fontSize: 20,
    color: "#C8C8C8",
  },
  inputLabel: {
    marginTop: 20,
    marginRight: 35,
    marginBottom: 20,
    fontSize: 20,
    color: "#C8C8C8",
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: "bold",
    marginLeft: -5,
  },
  inputFieldContainer: {
    width: "70%",
  },
  forgotText: {
    color: "#3A8DFF",
    fontWeight: "bold",
  },
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    width: "70%",
    marginTop: 80,
  },
  loginButton: {
    backgroundColor: "#3A8DFF",
    color: "#FFFFFF",
    fontFamily: "Monserrat, sans-serif",
    fontSize: 20,
    padding: "20px 80px 20px 80px",
    alignSelf: "center",
  },
}));

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
        <Typography className={classes.registerText}>
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
            <Box className={classes.loginContainer}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                className={classes.loginButton}
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
