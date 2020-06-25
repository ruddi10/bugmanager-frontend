import React, { Component } from "react";
import { Button, Icon, Image, Item, Label, Grid } from "semantic-ui-react";
class IssueList extends Component {
  state = {};
  render() {
    const { heading, issues } = this.props;
    let list;
    if (issues.count) {
      const end = issues.count < 5 ? issues.count : 5;
      list = issues.results.slice(0, end).map((issue) => (
        <Item.Content className="issuecontainer" key={issue.issue_id}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Label color="orange" horizontal>
                {issue.status}
              </Label>
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
            <span style={{ color: "grey" }} className="cinema">
              {issue.createdAt}
            </span>
          </div>
          <Item.Description
            style={{
              color: "#00BFFF",
              textAlign: "left",
              fontWeight: "bold",
              marginTop: "0.8rem",
            }}
          >
            #ISSUE{issue.issue_id}_p{issue.project}:{issue.heading}
          </Item.Description>
        </Item.Content>
      ));
    } else {
      list = <h1>No Issues</h1>;
    }
    return <Item.Group divided>{list}</Item.Group>;
  }
}

export default IssueList;
