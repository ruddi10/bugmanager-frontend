import React, { Component, Fragment, createRef } from "react";
import { Menu, Segment, Sticky, Popup, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { getCurrentUser } from "../utils/helperFunctions";
import http from "../services/httpservice";
import Avatar from "react-avatar";
export default class NavBar extends Component {
  async componentDidMount() {
    if (getCurrentUser()) {
      const { data } = await http.get(
        `http://127.0.0.1:8000/bugmanager/user/${getCurrentUser()}/`
      );
      this.props.onGetUserData(data);
    }
    console.log("Navbar Mounted");
  }

  handleLogout = () => {
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    window.location = "/";
  };
  render() {
    return (
      <Sticky context={this.props.contextRef}>
        <Menu tabular className="navi">
          <Menu.Item name="bugzilla" className="logo" />
          {getCurrentUser() && (
            <Fragment>
              <Menu.Item
                className="links"
                name="home"
                as={NavLink}
                to="/home"
              />
              <Menu.Item
                className="links"
                name="projects"
                as={NavLink}
                to="/projects"
              />
              <Menu.Item
                className="links"
                name="issues"
                as={NavLink}
                to="/issues"
              />
              <Menu.Item
                className="links"
                name="members"
                as={NavLink}
                to="/members"
              />
              <Menu.Menu position="right">
                {/* <Menu.Item className="links" name="logout" /> */}
                {this.props.user.profile && (
                  <Popup
                    content={
                      <div
                        onClick={this.handleLogout}
                        style={{ cursor: "pointer", padding: "0.8rem" }}
                      >
                        <Icon name="log out" color="red" />
                        Logout
                      </div>
                    }
                    basic
                    on="click"
                    trigger={
                      <div style={{ cursor: "pointer", padding: "0.4rem" }}>
                        <Avatar
                          name={this.props.user.profile.full_name}
                          round={true}
                          size="45"
                        />
                      </div>
                    }
                  />
                )}
              </Menu.Menu>
              <div ref={this.contextRef}></div>
            </Fragment>
          )}
        </Menu>
      </Sticky>
    );
  }
}
