import React, { Component, Fragment } from "react";
import { Grid, Image, Segment, Header, Button, Icon } from "semantic-ui-react";
import { isCurrentUser } from "../utils/helperFunctions";
import profilepic from "../sample pics/profile.jpeg";
import { Link } from "react-router-dom";
import MyModal from "./mymodal";
import http from "../services/httpservice";
import { toast } from "react-toastify";
import { withRouter } from "react-router";
class Profile extends Component {
  handlePromote = async () => {
    try {
      const response = await http.post(
        `http://127.0.0.1:8000/bugmanager/user/${this.props.user.id}/change_post/`,
        { action: "promote" }
      );
      toast.success("Success");
      this.props.history.push(`/members`);
    } catch (err) {
      console.log(err);
      if (err.response.status == 403) {
        toast.error("Not Allowed");
      } else {
        toast.error("Try Again Later");
      }
    }
  };
  handleDemote = async () => {
    try {
      const response = await http.post(
        `http://127.0.0.1:8000/bugmanager/user/${this.props.user.id}/change_post/`,
        { action: "" }
      );
      toast.success("Success");
      this.props.history.push(`/members`);
    } catch (err) {
      console.log(err);
      if (err.response.status == 403) {
        toast.error("Not Allowed");
      } else {
        toast.error("Try Again Later");
      }
    }
  };
  handleDisable = async () => {
    try {
      const response = await http.post(
        `http://127.0.0.1:8000/bugmanager/user/${this.props.user.id}/disable/`
      );
      toast.success("Success");
      this.props.history.push(`/members`);
      console.log("Still executed");
    } catch (err) {
      console.log(err);
      if (err.response.status == 403) {
        toast.error("Not Allowed");
      } else {
        toast.error("Try Again Later");
      }
    }
  };
  render() {
    const { user, loginUser } = this.props;
    const { is_superuser: is_admin } = loginUser;
    const { profile, is_superuser, id, username } = user;
    return (
      <Grid centered verticalAlign="center" columns={2}>
        <Grid.Row verticalAlign="middle">
          <Grid.Column
            width={5}
            style={{
              display: "flex",
              flexFlow: "column",
              alignItems: "center",
            }}
          >
            <Image src={profile.profilepic} size="small" circular />
            <Header as="h3">@{username}</Header>
          </Grid.Column>
          <Grid.Column width={9}>
            <Header as="h2">{profile.full_name}</Header>

            <Header className="admin" as="h3">
              {is_superuser ? "Admin" : "Member"}
            </Header>
            {is_admin && !isCurrentUser(id) && (
              <Fragment>
                {is_superuser ? (
                  <MyModal
                    trig={(a) => (
                      <Button color="blue" onClick={a}>
                        {" "}
                        <Icon name="level down alternate" color="white" />
                        Demote Admin
                      </Button>
                    )}
                    handleClick={this.handleDemote}
                    cont=" Do you really want to demote this person ?"
                  />
                ) : (
                  <MyModal
                    trig={(a) => (
                      <Button color="blue" onClick={a}>
                        {" "}
                        <Icon name="level up" color="white" />
                        Make Admin
                      </Button>
                    )}
                    handleClick={this.handlePromote}
                    cont=" Do you really want to make this person Admin?"
                  />
                )}

                <MyModal
                  trig={(a) => (
                    <Button color="red" onClick={a}>
                      {" "}
                      <Icon name="ban" color="white" />
                      Disable User
                    </Button>
                  )}
                  handleClick={this.handleDisable}
                  cont=" Do you really want to disable this user?"
                />
              </Fragment>
            )}
            {isCurrentUser(id) && (
              <Fragment>
                <Button positive as={Link} to="/addproject">
                  Create Project
                </Button>
                <Button color="grey">Change Username</Button>
              </Fragment>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default withRouter(Profile);
