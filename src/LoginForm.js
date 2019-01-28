import React from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import axios from 'axios';

class LoginForm extends React.Component {
  state = {
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  };

  getEmailError = email => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isValidEmail = emailRegex.test(email);
    return !isValidEmail ? "Invalid email." : "";
  };

  validateEmail = () => {
    const error = this.getEmailError(this.state.email);

    this.setState({ emailError: error });
    return !error;
  };

  getPasswordError = password => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const isValidPassword = true; //passwordRegex.test(password);
    return !isValidPassword
      ? "The password must contain minimum eight characters, at least one letter and one number."
      : "";
  };
 
  validatePassword = () => {
    const error = this.getPasswordError(this.state.password);

    this.setState({ passwordError: error });
    return !error;
  };

  onChangeEmail = event =>
    this.setState({
      email: event.target.value
    });

  onChangePassword = event =>
    this.setState({
      password: event.target.value
    });

  handleSubmit = () => {
    if (
      !this.validateEmail() ||
      !this.validatePassword()
    ) {
      return;
    }

    const data = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post('http://localhost:8000/login', `username=${this.state.email}&password=${this.state.password}`)
	    .then(function (response) {
		        console.log(response);
			  })
      .catch(function (error) {
	          console.log(error);
		    });
  };

  render() {
    return (
      <Grid container spacing={16}>
        <Grid item xs={3}>
          <TextField
            label="Email"
            value={this.state.email}
            error={!!this.state.emailError}
            helperText={this.state.emailError}
            onChange={this.onChangeEmail}
            margin="normal"
          />

          <TextField
            label="Password"
            value={this.state.password}
            error={!!this.state.passwordError}
            helperText={this.state.passwordError}
            type="password"
            onChange={this.onChangePassword}
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
            margin="normal"
          >
            Login
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default LoginForm;
