import React, { Component } from "react";
import {
  Button,
  Icon,
  Dropdown,
  Checkbox,
  Form,
  Accordion,
} from "semantic-ui-react";
class Filter extends Component {
  state = {};

  render() {
    return (
      <Button
        basic
        className="filter"
        color={this.props.visible ? "blue" : "grey"}
        content="Filter"
        onClick={this.props.handleClick}
        icon="sliders horizontal"
        labelPosition="right"
      />
    );
  }
}

export default Filter;
