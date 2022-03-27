import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const styles = {
  form: {
    textAlign: "center",
  },

  pageTitle: {
    margin: "10px auto 10px auto",
  },

  textField: {
    margin: "10px auto 10px auto",
  },

  button: {
    marginTop: 20,
    position: "relative",
  },

  customError: {
    color: "red",
    fontSize: "0.8",
  },

  progress: {
    position: "absolute",
  },
};

const navigate = useNavigate;

class login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("/login", userData)
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
        });
        localStorage.setItem("FBaseIdToken", `Bearer ${res.data.token}`);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          errors: "err.response.data",
          loading: false,
        });
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h3" className={classes.pageTitle}>
            <p>Login</p>
          </Typography>

          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              helperText={errors.email}
              error={errors.email ? true : false}
              onChange={this.handleChange}
              fullWidth
            />

            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              helperText={errors.password}
              error={errors.password ? true : false}
              onChange={this.handleChange}
              fullWidth
            />

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(login);
