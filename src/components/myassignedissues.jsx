import React, { Component } from "react";
import { Loader } from "semantic-ui-react";
import http from "../services/httpservice";
import IssueSkeleton from "./common/issueskeleton";
import { getCurrentUser } from "../utils/helperFunctions";
class AssignedIssuePage extends Component {
  state = {
    loading: true,
    issues: {},
    currentPage: 1,
    sortBy: "createdAt",
    Desc: true,
    heading: "Assigned",
    visible: false,
  };
  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }));
  handleSort = async (sortBy, Desc) => {
    const order = Desc ? "-" : "";
    this.setState({ loading: true });
    const { data: issues } = await http.get(
      `http://127.0.0.1:8000/bugmanager/issues/?assigned_to=${getCurrentUser()}&page=1&ordering=${order}${sortBy},-createdAt`
    );
    this.setState({ loading: false, sortBy, issues, Desc, currentPage: 1 });
  };
  handlePageChange = async (currentPage) => {
    const order = this.state.Desc ? "-" : "";
    this.setState({ loading: true });
    const { data: issues } = await http.get(
      `http://127.0.0.1:8000/bugmanager/issues/?assigned_to=${getCurrentUser()}&page=${currentPage}&ordering=${order}${
        this.state.sortBy
      },-createdAt`
    );
    this.setState({ loading: false, currentPage, issues });
  };
  async componentDidMount() {
    const order = this.state.Desc ? "-" : "";
    const { data: issues } = await http.get(
      `http://127.0.0.1:8000/bugmanager/issues/?assigned_to=${getCurrentUser()}&page=${
        this.state.currentPage
      }&ordering=${order}${this.state.sortBy}`
    );
    this.setState({ loading: false, issues });
  }
  render() {
    return this.state.loading ? (
      <Loader active size="massive" />
    ) : (
      <IssueSkeleton
        issues={this.state.issues}
        heading={this.state.heading}
        onSort={this.handleSort}
        sortBy={this.state.sortBy}
        Desc={this.state.Desc}
        currentPage={this.state.currentPage}
        onPagechange={this.handlePageChange}
        visible={this.state.visible}
        toggleVisibility={this.toggleVisibility}
        // sections={this.sections}
      />
    );
  }
}

export default AssignedIssuePage;
