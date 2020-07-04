import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { getCurrentUser } from "../utils/helperFunctions";
import http from "../services/httpservice";

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
  render() {
    return (
      <div>
        <Menu tabular className="navi">
          <Menu.Item name="bugzilla" className="logo" />
          <Menu.Item className="links" name="home" as={NavLink} to="/home" />
          <Menu.Item
            className="links"
            name="projects"
            as={NavLink}
            to="/projects"
          />
          <Menu.Item
            className="links"
            name="members"
            as={NavLink}
            to="/members"
          />
          <Menu.Menu position="right">
            <Menu.Item className="links" name="logout" />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
