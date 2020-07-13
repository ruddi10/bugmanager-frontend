import React, { Component, Fragment } from "react";
import { Card } from "semantic-ui-react";
import IssueCard from "./common/issuecard";
class IssueGroup extends Component {
  state = {};
  render() {
    const { issues, showproj } = this.props;
    let list;
    if (issues.length)
      list = issues.map((issue) => (
        <IssueCard
          sections={this.props.sections}
          issue={issue}
          showproj={showproj}
        />
      ));
    else list = <h1>NO ISSUES </h1>;
    return <Fragment>{list}</Fragment>;
  }
}

export default IssueGroup;
