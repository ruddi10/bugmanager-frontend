import React, { Component } from "react";
import { Card, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
class ProjectCard extends Component {
  render() {
    const { project, sections } = this.props;
    return (
      <Card key={project.id} color="orange" raised>
        {" "}
        <Card.Content>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Card.Header
              style={{ fontWeight: "bold" }}
              content={project.title}
            />
            <Label color={project.is_deployed ? "blue" : "red"} horizontal>
              {project.is_deployed ? "Deployed" : "Pending"}
            </Label>
          </div>
          <Card.Meta content={project.createdAt} />
          <Card.Description
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <div>Creator:</div>
            <div style={{ color: "rgba(0,0,0,.4)" }}>{project.creator}</div>
          </Card.Description>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* <Button
              as={Link}
              // to={{
              //   pathname: `/project/${project.id}`,
              //   state: { sections: this.props.sections },
              // }}
              to={`/project/${project.id}`}
              style={{ marginTop: "1.8rem" }}
              basic
              color="orange"
            >
              More Details
            </Button> */}

            <Link
              className="ui orange basic button"
              to={{
                pathname: `/project/${project.id}`,
                state: { sections: sections },
              }}
              style={{ marginTop: "1.8rem" }}
            >
              More Details
            </Link>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

export default ProjectCard;
