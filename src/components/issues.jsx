import React, { Component } from "react";
import { Loader } from "semantic-ui-react";
import http from "../services/httpservice";
import IssueSkeleton from "./common/issueskeleton";
class IssuePage extends Component {
  state = {
    loading: true,
    issues: {},
    currentPage: 1,
    sortBy: "createdAt",
    Desc: true,
    heading: "Issues",
    visible: false,
  };
  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }));
  handleSort = async (sortBy, Desc) => {
    const order = Desc ? "-" : "";
    this.setState({ loading: true });
    const { data: issues } = await http.get(
      `http://127.0.0.1:8000/bugmanager/issues/?page=1&ordering=${order}${sortBy},-createdAt`
    );
    this.setState({ loading: false, sortBy, issues, Desc, currentPage: 1 });
  };
  handlePageChange = async (currentPage) => {
    const order = this.state.Desc ? "-" : "";
    this.setState({ loading: true });
    const { data: issues } = await http.get(
      `http://127.0.0.1:8000/bugmanager/issues/?page=${currentPage}&ordering=${order}${this.state.sortBy},-createdAt`
    );
    this.setState({ loading: false, currentPage, issues });
  };
  async componentDidMount() {
    const order = this.state.Desc ? "-" : "";
    const { data: issues } = await http.get(
      `http://127.0.0.1:8000/bugmanager/issues/?page=${this.state.currentPage}&ordering=${order}${this.state.sortBy}`
    );
    this.setState({ loading: false, issues });
  }
  sections = [
    {
      key: "issue",
      content: "Issues",
      link: true,
      //active: false,
      to: "/issues",
    },
  ];
  render() {
    return this.state.loading ? (
      <Loader active size="massive" />
    ) : (
      <IssueSkeleton
        sections={this.sections}
        issues={this.state.issues}
        heading={this.state.heading}
        cname="projectcontainer top"
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

export default IssuePage;
