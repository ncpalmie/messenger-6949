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
import { makeStyles } from "@material-ui/core/styles";
import { register } from "../../store/utils/thunkCreators";

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
  loginButton: {
    width: "fit-content",
    whiteSpace: "nowrap",
    padding: "20px 70px 20px 70px",
    color: "#3A8DFF",
    boxShadow: "0px 0px 12px 1px #DCDCDC",
    fontSize: 20,
  },
  loginText: {
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
  registerContainer: {
    display: "flex",
    justifyContent: "center",
    width: "70%",
    marginTop: 40,
  },
  registerButton: {
    backgroundColor: "#3A8DFF",
    color: "#FFFFFF",
    fontFamily: "Monserrat, sans-serif",
    fontSize: 20,
    padding: "20px 80px 20px 80px",
    alignSelf: "center",
  },
}));

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
        <Typography className={classes.loginText}>
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
            <Box className={classes.registerContainer}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                className={classes.registerButton}
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
