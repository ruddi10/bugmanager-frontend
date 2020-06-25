import React, { Component, Fragment } from "react";
import { Container, Grid } from "semantic-ui-react";

import Profile from "../profile";
import IssueProfile from "../profileissues";
class ProfileColumn extends Component {
  render() {
    return (
      <Fragment>
        <Grid columns={1} divided="vertically" centered>
          <Grid.Row>
            <Profile user={this.props.user} loginUser={this.props.loginUser} />
          </Grid.Row>
          <Grid.Row>
            <IssueProfile
              rissues={this.props.rissues}
              aissues={this.props.aissues}
            />
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}

export default ProfileColumn;
