import React, { Component } from "react";
import { Loader } from "semantic-ui-react";
import http from "../services/httpservice";
import ProjectSkeleton from "./common/projectSkeleton";
import { getCurrentUser } from "../utils/helperFunctions";
class MyProjects extends Component {
  state = {
    loading: true,
    projects: {},
    currentPage: 1,
    sortBy: "createdAt",
    Desc: true,
    heading: "My Projects",
  };
  handleSort = async (sortBy, Desc) => {
    const order = Desc ? "-" : "";
    this.setState({ loading: true });
    const { data: projects } = await http.get(
      `http://127.0.0.1:8000/bugmanager/project/?page=${
        this.state.currentPage
      }&ordering=${order}${sortBy},-createdAt&creator=${getCurrentUser()}`
    );
    this.setState({ loading: false, sortBy, projects, Desc });
  };
  async componentDidMount() {
    const order = this.state.Desc ? "-" : "";
    const { data: projects } = await http.get(
      `http://127.0.0.1:8000/bugmanager/project/?page=${
        this.state.currentPage
      }&ordering=${order}${this.state.sortBy}&creator=${getCurrentUser()}`
    );

    this.setState({ loading: false, projects });
  }
  render() {
    return this.state.loading ? (
      <Loader active size="massive" />
    ) : (
      <ProjectSkeleton
        projects={this.state.projects}
        heading={this.state.heading}
        cname="projectcontainer"
        onSort={this.handleSort}
        sortBy={this.state.sortBy}
        Desc={this.state.Desc}
      />
    );
  }
}

export default MyProjects;
