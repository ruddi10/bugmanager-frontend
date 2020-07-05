import React, { Component } from "react";
import http from "../services/httpservice";
import ProfileColumn from "./common/profilesection";
import { Loader, Container } from "semantic-ui-react";
class UserDetail extends Component {
  state = { loading: true, user: {}, rissues: {}, aissues: {} };
  async componentDidMount() {
    const { data: user } = await http.get(
      `http://127.0.0.1:8000/bugmanager/user/${this.props.match.params.id}/`
    );
    const { data: rissues } = await http.get(
      `http://localhost:8000/bugmanager/issues/?ordering=-createdAt&reporter=${this.props.match.params.id}`
    );
    const { data: aissues } = await http.get(
      `http://localhost:8000/bugmanager/issues/?ordering=-createdAt&assigned_to=${this.props.match.params.id}`
    );
    this.setState({ user, loading: false, rissues, aissues });
  }
  render() {
    return this.state.loading ? (
      <Loader active size="massive" />
    ) : (
      <Container style={{ marginTop: "3rem" }}>
        <ProfileColumn
          user={this.state.user}
          loginUser={this.props.user}
          aissues={this.state.aissues}
          rissues={this.state.rissues}
        />
      </Container>
    );
  }
}

export default UserDetail;
