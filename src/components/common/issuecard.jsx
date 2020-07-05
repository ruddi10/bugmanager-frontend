import React, { Component } from "react";
import { Card, Label } from "semantic-ui-react";
class IssueCard extends Component {
  colors = {
    Pending: "red",
    Resolved: "green",
    "To Be Disscussed": "grey",
    "In Process": "blue",
  };
  priority = {
    High: "red",
    Moderate: "olive",
    Low: "orange",
  };

  render() {
    const { issue, showproj } = this.props;
    return (
      <Card fluid color="orange">
        <Label
          attached="top"
          style={{
            color: "white",
            backgroundColor: this.priority[issue.priority],
          }}
        >
          {issue.priority}
        </Label>
        <Card.Content>
          <Card.Header
            style={{
              fontWeight: "bolder",
              fontSize: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>{issue.heading}</div>
            <Label color={this.colors[issue.status]} horizontal>
              {issue.status}
            </Label>
          </Card.Header>
          <div style={{ marginTop: "0.8rem" }}>
            {issue.tags.map((tag) => (
              <Label
                style={{
                  color: "white",
                  backgroundColor: "#8F849E",
                  fontSize: "0.8rem",
                }}
                key={tag}
                horizontal
              >
                {tag}
              </Label>
            ))}
          </div>
          {showproj && (
            <div
              style={{
                color: "#767676",
                fontWeight: "bold",
                fontSize: "1rem",
                marginTop: "2rem",
              }}
            >
              Project :
              <span style={{ color: "orange" }}>{issue.get_project.title}</span>
            </div>
          )}
          <Card.Meta
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1.8rem",
            }}
          >
            <div
              style={{
                color: "#767676",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >{`By: ${issue.reporter}`}</div>
            <div
              style={{
                color: "#767676",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >{` ${issue.createdAt}`}</div>
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

export default IssueCard;
