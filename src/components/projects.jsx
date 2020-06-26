import React, { Component, Fragment } from "react";
import { Loader, Card, Grid, Container } from "semantic-ui-react";
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
        cname="projectcontainer"
      />
    );
  }
}

export default ProjectPage;
