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
  Transition,
  Image,
} from "semantic-ui-react";
import ProjectList from "./projectlist";
import Sorter from "./sort";
import Paginator from "./pagination";
import { getTotalPages } from "../../utils/helperFunctions";
import Filter from "./filter";
import FilterForm from "./filterform";
import { Link } from "react-router-dom";
class ProjectSkeleton extends Component {
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
              <Header as="h1">{this.props.heading}</Header>
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
              <Filter
                handleClick={this.props.toggleVisibility}
                visible={this.props.visible}
              />
              <Button
                size="small"
                color="orange"
                as={Link}
                to="/addproject"
                style={{ padding: "1rem", fontSize: "1rem" }}
              >
                <Icon name="add" />
                Add Project
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Transition
            visible={this.props.visible}
            animation="scale"
            duration={500}
          >
            <Grid.Row>
              <FilterForm />
            </Grid.Row>
          </Transition>

          <Grid.Row>
            <ProjectList
              sections={this.props.sections}
              projects={this.props.projects}
            />
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
