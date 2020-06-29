import React, { Component } from "react";
import {
  Loader,
  Card,
  Grid,
  Container,
  Button,
  Icon,
  GridColumn,
  Header,
} from "semantic-ui-react";
import ProjectList from "./projectlist";
import Sorter from "./sort";
import Paginator from "./pagination";
import { getTotalPages } from "../../utils/helperFunctions";
class ProjectSkeleton extends Component {
  state = {};
  sortOptions = [
    {
      key: "Date Created",
      text: "Date Created",
      value: "createdAt",
    },
    {
      key: "Title",
      text: "Title",
      value: "title",
    },
  ];

  render() {
    return (
      <Container className={this.props.cname ? this.props.cname : ""}>
        <Grid style={{ margin: "0" }} columns={1}>
          <Grid.Row columns={2}>
            <Grid.Column style={{ display: "flex" }}>
              {" "}
              <Header as="h1" st>
                {this.props.heading}
              </Header>
              <span className="subscript">
                {this.props.projects.count} Total
              </span>
              <Sorter
                sortOptions={this.sortOptions}
                onSort={this.props.onSort}
                sortBy={this.props.sortBy}
                Desc={this.props.Desc}
              />
            </Grid.Column>

            <Grid.Column
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button size="small" icon labelPosition="right">
                Filter
                <Icon name="filter" />
              </Button>
              <Button size="small" color="orange">
                <Icon name="add" />
                Add Project
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <ProjectList projects={this.props.projects} />
          </Grid.Row>
        </Grid>
        {getTotalPages(12, this.props.projects.count) && (
          <Paginator
            totalpages={getTotalPages(12, this.props.projects.count)}
            currentPage={this.props.currentPage}
            onPagechange={this.props.onPagechange}
          />
        )}
      </Container>
    );
  }
}

export default ProjectSkeleton;
