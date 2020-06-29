import React, { Component } from "react";
import { Dropdown, Icon, Button } from "semantic-ui-react";

class Sorter extends Component {
  state = {};
  handleChange = (e, d) => {
    console.log(e);
    console.log(d.value);
    this.props.onSort(d.value, this.props.Desc);
  };
  handleClick = () => {
    this.props.onSort(this.props.sortBy, !this.props.Desc);
  };
  render() {
    return (
      <span className="subscript">
        Sort by:{" "}
        <Dropdown
          inline
          options={this.props.sortOptions}
          onChange={this.handleChange}
          value={this.props.sortBy}
        />
        <Icon
          style={{ marginLeft: "0.4rem", cursor: "pointer" }}
          name={`sort content ${this.props.Desc ? "ascending" : "descending"}`}
          onClick={this.handleClick}
        />
      </span>
    );
  }
}

export default Sorter;
