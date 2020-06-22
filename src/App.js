import React, { Component } from "react";
import "./App.css";
import jwtDecode from "jwt-decode";
import { Route, Switch } from "react-router-dom";
import LoginButton from "./components/loginButton";
import Landing from "./components/landing";
import Home from "./components/home";

class App extends Component {
  state = {
    user: "",
    errors: "",
  };
  handleLoginError = (errors) => {
    this.setState({ errors });
  };
  handleLoginSuccess = () => {
    try {
      const token = localStorage.getItem("access");
      const detoken = jwtDecode(token);
      this.setState({ user: detoken.user_id });
    } catch (ex) {}
  };
  render() {
    return (
      <Switch>
        <Route path="/home" component={Home} />
        <Route
          path="/landing"
          render={(props) => (
            <Landing
              {...props}
              onError={this.handleLoginError}
              onSuccess={this.handleLoginSuccess}
            />
          )}
        />
        <Route path="/" component={LoginButton} />
      </Switch>
    );
  }
}

export default App;
