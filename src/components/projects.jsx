import React, { Component } from "react";
import { Loader } from "semantic-ui-react";
import http from "../services/httpservice";
import ProjectSkeleton from "./common/projectSkeleton";
class ProjectPage extends Component {
  state = {
    loading: true,
    projects: {},
    currentPage: 1,
    sortBy: "createdAt",
    Desc: true,
    heading: "Projects",
  };
  handleSort = async (sortBy, Desc) => {
    const order = Desc ? "-" : "";
    this.setState({ loading: true });
    const { data: projects } = await http.get(
      `http://127.0.0.1:8000/bugmanager/project/?page=1&ordering=${order}${sortBy},-createdAt`
    );
    this.setState({ loading: false, sortBy, projects, Desc, currentPage: 1 });
  };
  handlePageChange = async (currentPage) => {
    const order = this.state.Desc ? "-" : "";
    this.setState({ loading: true });
    const { data: projects } = await http.get(
      `http://127.0.0.1:8000/bugmanager/project/?page=${currentPage}&ordering=${order}${this.state.sortBy},-createdAt`
    );
    this.setState({ loading: false, currentPage, projects });
  };
  async componentDidMount() {
    const order = this.state.Desc ? "-" : "";
    const { data: projects } = await http.get(
      `http://127.0.0.1:8000/bugmanager/project/?page=${this.state.currentPage}&ordering=${order}${this.state.sortBy}`
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
        cname="projectcontainer top"
        onSort={this.handleSort}
        sortBy={this.state.sortBy}
        Desc={this.state.Desc}
        currentPage={this.state.currentPage}
        onPagechange={this.handlePageChange}
      />
    );
  }
}

export default ProjectPage;
