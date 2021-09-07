import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: "2",
    height: "fit-content",
  },
  header: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 50,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      margin: 10,
    },
  },
  form: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    marginLeft: 160,
    marginTop: 80,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      alignItems: "center",
      margin: 0,
    },
  },
  registerButton: {
    padding: "20px 50px 20px 50px",
    color: "#3A8DFF",
    boxShadow: "0px 0px 12px 1px #DCDCDC",
    fontSize: 20,
    [theme.breakpoints.down("sm")]: {
      padding: "10px 25px 10px 25px",
      fontSize: 15,
    },
  },
  switchText: {
    marginRight: 35,
    fontSize: 20,
    color: "#C8C8C8",
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      marginRight: 20,
      fontSize: 16,
    },
  },
  inputLabel: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    color: "#C8C8C8",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 0,
    },
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: "bold",
    marginLeft: -5,
  },
  inputFieldContainer: {
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  forgotText: {
    color: "#3A8DFF",
    fontWeight: "bold",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    width: "70%",
    marginTop: 80,
    [theme.breakpoints.down("sm")]: {
      marginTop: 10,
      marginLeft: 40,
    },
  },
  formButton: {
    backgroundColor: "#3A8DFF",
    color: "#FFFFFF",
    fontFamily: "Monserrat, sans-serif",
    fontSize: 20,
    padding: "20px 80px 20px 80px",
  },
  loginButton: {
    padding: "20px 60px 20px 60px",
    color: "#3A8DFF",
    boxShadow: "0px 0px 12px 1px #DCDCDC",
    fontSize: 20,
    [theme.breakpoints.down("sm")]: {
      padding: "10px 25px 10px 25px",
      fontSize: 15,
    },
  },
}));

export { useStyles };
