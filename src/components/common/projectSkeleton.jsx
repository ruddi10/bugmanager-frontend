import React, { Component } from "react";
import { Loader, Card, Grid, Container } from "semantic-ui-react";
import ProjectList from "./projectlist";
class ProjectSkeleton extends Component {
  state = {};
  render() {
    return (
      <Container className={this.props.cname ? this.props.cname : ""}>
        <Grid columns={1}>
          <Grid.Row>
            <h1>{this.props.heading}</h1>
          </Grid.Row>
          <Grid.Row>
            <ProjectList projects={this.props.projects} />
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default ProjectSkeleton;
