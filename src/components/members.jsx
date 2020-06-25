import React, { Component } from "react";
import { Loader } from "semantic-ui-react";
import http from "../services/httpservice";
class MemberList extends Component {
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
      <h1>Menbers</h1>
    );
  }
}

export default MemberList;
