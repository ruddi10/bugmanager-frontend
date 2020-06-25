import React, { Component, Fragment } from "react";
import { Grid, Image, Segment, Header, Button } from "semantic-ui-react";
import { isCurrentUser } from "../utils/helperFunctions";
import profilepic from "../sample pics/profile.jpeg";
class Profile extends Component {
  render() {
    const { user, loginUser } = this.props;
    const { is_superuser: is_admin } = loginUser;
    const { profile, is_superuser, id, username } = user;
    return (
      <Grid centered verticalAlign="bottom" columns={2}>
        <Grid.Row>
          <Grid.Column width={5}>
            <Image src={profilepic} size="small" circular />
            <Header as="h3">@{username}</Header>
          </Grid.Column>
          <Grid.Column width={9}>
            <Header as="h2">{profile.full_name}</Header>

            <Header className="admin" as="h3">
              {is_superuser ? "Admin" : "Member"}
            </Header>
            {is_admin && !isCurrentUser(id) && (
              <Fragment>
                <Button color="blue">Make Admin</Button>
                <Button color="red">Disable User</Button>
              </Fragment>
            )}
            {isCurrentUser(id) && (
              <Fragment>
                <Button positive>Create Project</Button>
                <Button color="grey">Change Username</Button>
              </Fragment>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Profile;
