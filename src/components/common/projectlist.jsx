import React, { Component } from "react";
import { Card, Label, Button } from "semantic-ui-react";
import ProjectCard from "./projectcard";
class ProjectList extends Component {
  state = {};

  render() {
    if (!this.props.projects.count) {
      return <h1>No Projects</h1>;
    }
    const projects = this.props.projects.results.map((project) => (
      <ProjectCard
        sections={this.props.sections}
        key={project.id}
        project={project}
      />
    ));
    return (
      <Card.Group className="projectgroup" itemsPerRow={4}>
        {projects}
      </Card.Group>
    );
  }
}

export default ProjectList;
