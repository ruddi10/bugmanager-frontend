import React, { Component, Fragment } from "react";
import http from "../services/httpservice";
import ProfileColumn from "./common/profilesection";
import { Loader, Container } from "semantic-ui-react";
import MyBreadcrumb from "./common/mybreadcrumb";
class UserDetail extends Component {
  state = { loading: true, user: {}, rissues: {}, aissues: {} };
  sections = [
    {
      key: "member",
      content: "Members",
      link: true,
      to: "/members",
    },
  ];
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
    if (this.state.loading) {
      return <Loader active size="massive" />;
    }
    const { user } = this.state;
    this.sections.push({
      key: user.id,
      content: user.username,
      active: true,
      link: false,
    });
    return (
      <Fragment>
        <MyBreadcrumb sections={this.sections} />
        <Container style={{ marginTop: "3rem" }}>
          <ProfileColumn
            user={this.state.user}
            loginUser={this.props.user}
            aissues={this.state.aissues}
            rissues={this.state.rissues}
          />
        </Container>
      </Fragment>
    );
  }
}

export default UserDetail;
