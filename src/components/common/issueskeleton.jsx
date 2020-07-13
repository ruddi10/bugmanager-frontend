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
import IssueGroup from "../issuegroup";
import { Link } from "react-router-dom";
class IssueSkeleton extends Component {
  sortOptions = [
    {
      key: "Date Created",
      text: "Date Created",
      value: "createdAt",
    },
    {
      key: "Title",
      text: "Title",
      value: "heading",
    },
    {
      key: "Updated At",
      text: "Updated At",
      value: "updatedAt",
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
              <span className="subscript">{this.props.issues.count} Total</span>
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
              <Button as={Link} to="/addissue" size="small" color="orange">
                <Icon name="add" />
                Add Issue
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
            <IssueGroup
              sections={this.props.sections}
              issues={this.props.issues.results}
              showproj={true}
            />
          </Grid.Row>
        </Grid>
        {getTotalPages(5, this.props.issues.count) && (
          <Paginator
            totalpages={getTotalPages(5, this.props.issues.count)}
            currentPage={this.props.currentPage}
            onPagechange={this.props.onPagechange}
          />
        )}
      </Container>
    );
  }
}

export default IssueSkeleton;
