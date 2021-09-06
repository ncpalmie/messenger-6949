import React from "react";
import { Route, Switch, withRouter, useRouteMatch } from "react-router-dom";
import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Banner from "./Banner";
import Signup from "../../Signup";
import Login from "./Login";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 15,
  },
}));

const Landing = () => {
  const classes = useStyles();
  const { path } = useRouteMatch();
  return (
    <>
      <Grid container className={classes.root}>
        <Banner></Banner>
        <Switch>
          <Route path={`${path}/login`} component={Login} />
          <Route path={`${path}/register`} component={Signup} />
        </Switch>
      </Grid>
    </>
  );
};

export default withRouter(Landing);
