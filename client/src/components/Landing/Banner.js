import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../../assets/bg-img.png";
import { ReactComponent as BubbleSvg } from "../../assets/bubble.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `linear-gradient(to bottom, rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85)), url(${bgImage})`,
    backgroundSize: "cover",
    flex: "1.5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      flex: "1",
    },
  },
  bubble: {
    marginLeft: 0,
    overflow: "visible",
    width: "15%",
    height: "15%",
    [theme.breakpoints.down("sm")]: {
      width: "25%",
      height: "25%",
    },
  },
  text: {
    fontSize: 35,
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: 40,
    paddingLeft: 150,
    paddingRight: 150,
    [theme.breakpoints.down("sm")]: {
      padding: 30,
      fontSize: 30,
      marginTop: 20,
    },
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.root}>
        <BubbleSvg className={classes.bubble} />
        <Typography className={classes.text}>
          Converse with anyone with any language
        </Typography>
      </Box>
    </>
  );
};

export default Banner;
