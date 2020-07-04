import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

class ProfileSideNav extends Component {
  // state = { activeItem: "profile" };

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const activeItem = this.props.location.pathname.split("/")[2]
      ? this.props.location.pathname.split("/")[2]
      : "profile";
    // console.log(this.props.location.pathname.split("/")[2]);
    return (
      <Menu className="psidenav" pointing vertical>
        <Menu.Item
          as={Link}
          to="/home"
          className="psideitem"
          name="profile"
          active={activeItem === "profile"}
          // onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link}
          to="/home/myprojects"
          className="psideitem"
          name="my projects"
          active={activeItem === "myprojects"}
          // onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link}
          to="/home/rissues"
          className="psideitem"
          name="reported issues"
          active={activeItem === "rissues"}
          // onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link}
          to="/home/aissues"
          className="psideitem"
          name="assigned issues"
          active={activeItem === "aissues"}
          // onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}

export default ProfileSideNav;
