import React, { Component } from "react";
import {
  Loader,
  Table,
  Container,
  Divider,
  Icon,
  Popup,
  Segment,
  Grid,
  Header,
  Transition,
} from "semantic-ui-react";
import http from "../services/httpservice";
import MemberTable from "./memberlist";
import Sorter from "./common/sort";
import Filter from "./common/filter";
import FilterForm from "./common/filterform";
import Paginator from "./common/pagination";
import { getTotalPages, getCurrentUser } from "../utils/helperFunctions";
class MemberList extends Component {
  state = {
    loading: true,
    users: {},
    currentPage: 1,
    sortBy: "username",
    Desc: true,
    heading: "Issues",
    visible: false,
  };
  sortOptions = [
    {
      key: "Username",
      text: "Username",
      value: "username",
    },
  ];
  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }));
  handleSort = async (sortBy, Desc) => {
    const order = Desc ? "-" : "";
    this.setState({ loading: true });
    const { data: users } = await http.get(
      `http://127.0.0.1:8000/bugmanager/user/?page=1&ordering=${order}${sortBy}`
    );
    this.setState({ loading: false, sortBy, users, Desc, currentPage: 1 });
  };
  handlePageChange = async (currentPage) => {
    const order = this.state.Desc ? "-" : "";
    this.setState({ loading: true });
    const { data: users } = await http.get(
      `http://127.0.0.1:8000/bugmanager/user/?page=${currentPage}&ordering=${order}${this.state.sortBy}`
    );
    this.setState({ loading: false, currentPage, users });
  };
  async componentDidMount() {
    const order = this.state.Desc ? "-" : "";
    const { data: users } = await http.get(
      `http://127.0.0.1:8000/bugmanager/user/?page=1&ordering=${order}${this.state.sortBy}`
    );
    this.setState({ loading: false, users });
  }
  render() {
    if (this.state.loading) return <Loader active size="massive" />;
    const { users } = this.state;
    return (
      <Container className="projectcontainer top">
        <Grid style={{ margin: "0" }} columns={1}>
          <Grid.Row columns={2}>
            <Grid.Column style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <Header as="h1">Users</Header>
              <span className="subscript">{this.state.users.count} Total</span>
              <Sorter
                sortOptions={this.sortOptions}
                onSort={this.handleSort}
                sortBy={this.state.sortBy}
                Desc={this.state.Desc}
              />
            </Grid.Column>

            <Grid.Column
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Filter
                handleClick={this.toggleVisibility}
                visible={this.state.visible}
              />
            </Grid.Column>
          </Grid.Row>
          <Transition
            visible={this.state.visible}
            animation="scale"
            duration={500}
          >
            <Grid.Row>
              <FilterForm />
            </Grid.Row>
          </Transition>

          <Grid.Row>
            <MemberTable users={this.state.users} user={this.props.user} />
          </Grid.Row>
        </Grid>
        {getTotalPages(10, users.count) && (
          <Paginator
            totalpages={getTotalPages(10, users.count)}
            currentPage={this.state.currentPage}
            onPagechange={this.handlePageChange}
          />
        )}
      </Container>
    );
  }
}

export default MemberList;
