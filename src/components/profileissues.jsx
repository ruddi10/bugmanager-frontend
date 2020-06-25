import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import IssueList from "./issueList";
class IssueProfile extends Component {
  state = {};
  panes = [
    {
      menuItem: "Assigned Issues",
      render: () => (
        <Tab.Pane attached={false}>
          <IssueList issues={this.props.aissues} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Reported Issues",
      render: () => (
        <Tab.Pane attached={false}>
          <IssueList issues={this.props.rissues} />
        </Tab.Pane>
      ),
    },
  ];
  render() {
    return (
      <Tab
        className="homeissue"
        menu={{ secondary: true, pointing: true }}
        panes={this.panes}
      />
    );
  }
}

export default IssueProfile;
