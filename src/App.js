import React, { Component, Fragment } from "react";
import "./App.css";

import { Route, Switch, Redirect } from "react-router-dom";
import LoginButton from "./components/loginButton";
import Landing from "./components/landing";
import Home from "./components/home";
import { getCurrentUser } from "./utils/helperFunctions";
import NavBar from "./components/navbar";
import ProjectPage from "./components/projects";
import MemberList from "./components/members";

class App extends Component {
  state = {
    user: {},
    errors: "",
  };
  handleLoginError = (errors) => {
    this.setState({ errors });
  };
  handleSetUser = (user) => {
    this.setState({ user });
  };
  render() {
    return (
      <Fragment>
        <NavBar />
        <Switch>
          <Route
            path="/home"
            render={(props) => (
              <Home
                {...props}
                onGetUserData={this.handleSetUser}
                user={this.state.user}
              />
            )}
          />
          <Route
            path="/projects"
            render={(props) => (
              <ProjectPage {...props} user={this.state.user} />
            )}
          />
          <Route
            path="/members"
            render={(props) => <MemberList {...props} user={this.state.user} />}
          />
          <Route
            path="/landing"
            render={(props) => (
              <Landing {...props} onError={this.handleLoginError} />
            )}
          />
          <Route
            path="/"
            render={(props) => {
              if (getCurrentUser()) {
                return <Redirect to="/home" />;
              }
              return <LoginButton {...props} errors={this.state.errors} />;
            }}
          />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
