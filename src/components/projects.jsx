import React, { Component } from "react";
import { Loader } from "semantic-ui-react";

import http from "../services/httpservice";
class ProjectList extends Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    this.setState({ loading: false });
  }
  render() {
    return this.state.loading ? (
      <Loader active size="massive" />
    ) : (
      <h1>Projects</h1>
    );
  }
}

export default ProjectList;
