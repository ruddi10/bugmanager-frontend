import React, { Component } from "react";
import { Loader, Container } from "semantic-ui-react";
import axios from "axios";
import { Route, Switch, Redirect } from "react-router-dom";
import http from "../services/httpservice";
import ProfileColumn from "./common/profilesection";
import ProfileSideNav from "./profilesidenav";
import { Grid } from "semantic-ui-react";
import ProjectList from "./projects";
import IssueList from "./issueList";
import { getCurrentUser } from "../utils/helperFunctions";
import MyProjects from "./myprojects";
import AssignedIssuePage from "./myassignedissues";
import ReportedIssuePage from "./myreportedissue";
class Home extends Component {
  state = {
    loading: true,
    aissues: {},
    rissues: {},
  };
  async componentDidMount() {
    const { data } = await http.get(
      `http://127.0.0.1:8000/bugmanager/user/${getCurrentUser()}/`
    );
    // console.log(data);
    const { data: rissues } = await http.get(
      `http://localhost:8000/bugmanager/issues/?ordering=-createdAt&reporter=${getCurrentUser()}`
    );
    const { data: aissues } = await http.get(
      `http://localhost:8000/bugmanager/issues/?ordering=-createdAt&assigned_to=${getCurrentUser()}`
    );
    console.log(rissues);
    console.log(aissues);

    this.props.onGetUserData(data);
    this.setState({ loading: false, aissues, rissues });
  }
  render() {
    return this.state.loading ? (
      <Loader active size="massive" />
    ) : (
      <Grid className="gridProfile" columns={2}>
        <Grid.Row>
          <Grid.Column width={4}>
            <ProfileSideNav {...this.props} />
          </Grid.Column>
          <Grid.Column width={12}>
            <Switch>
              <Route
                path="/home/myprojects"
                render={(props) => (
                  <MyProjects {...props} user={this.props.user} />
                )}
              />
              <Route
                path="/home/rissues"
                render={(props) => (
                  <ReportedIssuePage {...props} user={this.props.user} />
                )}
              />
              <Route
                path="/home/aissues"
                render={(props) => (
                  <AssignedIssuePage {...props} user={this.props.user} />
                )}
              />
              <Route
                path="/home"
                render={(props) => (
                  <ProfileColumn
                    {...props}
                    user={this.props.user}
                    loginUser={this.props.user}
                    aissues={this.state.aissues}
                    rissues={this.state.rissues}
                  />
                )}
              />
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;
