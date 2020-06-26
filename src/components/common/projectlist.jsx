import React, { Component } from "react";
import { Card, Label, Button } from "semantic-ui-react";
import ProjectCard from "./projectcard";
class ProjectList extends Component {
  state = {};

  render() {
    const projects = this.props.projects.results.map((project) => (
      <ProjectCard project={project} />
    ));
    return (
      <Card.Group className="projectgroup" itemsPerRow={4}>
        {projects}
      </Card.Group>
    );
  }
}

export default ProjectList;
