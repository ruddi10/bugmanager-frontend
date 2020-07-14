import React, { Component, Fragment } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginButton from "./components/loginButton";
import Landing from "./components/landing";
import Home from "./components/home";
import { getCurrentUser } from "./utils/helperFunctions";
import NavBar from "./components/navbar";
import ProjectPage from "./components/projects";
import MemberList from "./components/members";
import ProjectDetail from "./components/projectdetail";
import IssuePage from "./components/issues";
import UserDetail from "./components/userdetail";
import AddProjectForm from "./components/addprojectform";
import ServerError from "./components/servererror";
import NotFound from "./components/notfound";
import AddIssueForm from "./components/addissueform";
import IssueDetail from "./components/issuedetail";

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
        <NavBar onGetUserData={this.handleSetUser} user={this.state.user} />
        <ToastContainer />
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
            path="/editproject"
            exact
            render={(props) => (
              <AddProjectForm {...props} user={this.state.user} />
            )}
          />
          <Route
            path="/issue/:id"
            render={(props) => (
              <IssueDetail {...props} user={this.state.user} />
            )}
          />
          <Route
            path="/addissue"
            render={(props) => (
              <AddIssueForm {...props} user={this.state.user} />
            )}
          />
          <Route
            path="/servererror"
            render={(props) => (
              <ServerError
                {...props}
                onGetUserData={this.handleSetUser}
                user={this.state.user}
              />
            )}
          />
          <Route
            path="/notfound"
            render={(props) => (
              <NotFound
                {...props}
                onGetUserData={this.handleSetUser}
                user={this.state.user}
              />
            )}
          />
          <Route
            path="/addproject"
            render={(props) => (
              <AddProjectForm {...props} user={this.state.user} />
            )}
          />
          <Route
            path="/project/:id"
            render={(props) => (
              <ProjectDetail {...props} user={this.state.user} />
            )}
          />
          <Route
            path="/projects"
            render={(props) => (
              <ProjectPage {...props} user={this.state.user} />
            )}
          />
          <Route
            path="/issues"
            render={(props) => <IssuePage {...props} user={this.state.user} />}
          />
          <Route
            path="/member/:id"
            render={(props) => <UserDetail {...props} user={this.state.user} />}
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
            exact
            render={(props) => {
              if (getCurrentUser()) {
                return <Redirect to="/home" />;
              }
              return <LoginButton {...props} errors={this.state.errors} />;
            }}
          />
          <Redirect to="/notfound" />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
