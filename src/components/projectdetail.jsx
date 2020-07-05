import React, { Component, Fragment } from "react";
import {
  Container,
  Loader,
  Grid,
  Header,
  Segment,
  List,
  Image,
  Button,
  Icon,
  Label,
  Statistic,
} from "semantic-ui-react";
import MyBreadcrumb from "./common/mybreadcrumb";
import http from "../services/httpservice";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import ReadMoreReact from "read-more-react";
import IssueList from "./issueList";
import IssueGroup from "./issuegroup";
class ProjectDetail extends Component {
  state = { loading: true, project: {} };
  async componentDidMount() {
    const { data: project } = await http.get(
      `http://127.0.0.1:8000/bugmanager/project/${this.props.match.params.id}/`
    );
    this.setState({ project, loading: false });
    console.log(project);
  }
  hasauthority = (user, project) => {
    const isCreator = user.id == project.get_creator.id;
    const isTeam = project.team_list.filter((member) => member.id == user.id);

    console.log(isTeam);
    return user.is_superuser || Boolean(isTeam.length) || isCreator;
  };
  render() {
    if (this.state.loading) return <Loader active size="massive" />;
    const { state } = this.props.location;

    let section = state
      ? state.sections
      : [
          {
            key: "project",
            content: "Projects",
            link: true,
            //active: false,
            to: "/projects",
          },
        ];
    const { project } = this.state;
    const { user } = this.props;
    let sections = [...section];
    sections.push({
      key: project.id,
      content: project.title,
      active: true,
      link: false,
    });
    const teamList = project.team_list.map((member) => (
      <List.Item>
        <Image avatar src={member.profilepic} />
        <List.Content>
          <List.Header
            style={{
              color: "grey",
              fontSize: "1rem",
              fontWeight: "normal",
            }}
          >
            {member.username}
          </List.Header>
        </List.Content>
      </List.Item>
    ));
    return (
      <Fragment>
        <MyBreadcrumb sections={sections} />
        <Container className="mycustomcontainer">
          <Grid columns={1} divided="vertically">
            <Grid.Row
              style={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Segment
                style={{
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: " #F8F8F8",
                }}
                padded
              >
                <Header as="h1" color="orange">
                  {project.title}
                </Header>
                <Label color={project.is_deployed ? "green" : "red"} horizontal>
                  {project.is_deployed ? "Deployed" : "Pending"}
                </Label>
              </Segment>
              <div>
                {" "}
                {this.hasauthority(user, project) && (
                  <Button secondary>
                    {" "}
                    <Icon name="edit" color="white" />
                    Edit Project
                  </Button>
                )}
                <Button positive>
                  <Icon name="add" color="white" />
                  Report Bug
                </Button>{" "}
                {this.hasauthority(user, project) && (
                  <Button negative>
                    {" "}
                    <Icon name="delete" color="white" />
                    Delete Project
                  </Button>
                )}
              </div>
            </Grid.Row>
            <Grid.Row>
              <Grid columns={2} padded>
                <Grid.Row>
                  <Grid.Column
                    style={{
                      color: "#767676",
                      fontWeight: "bolder",
                      fontSize: "1rem",
                    }}
                  >
                    Creator
                  </Grid.Column>
                  <Grid.Column
                    style={{
                      color: "grey",
                      fontSize: "1rem",
                    }}
                  >
                    {project.creator}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column
                    style={{
                      color: "#767676",
                      fontWeight: "bolder",
                      fontSize: "1rem",
                    }}
                  >
                    Created At
                  </Grid.Column>
                  <Grid.Column
                    style={{
                      color: "grey",
                      fontSize: "1rem",
                    }}
                  >
                    {project.createdAt}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column
                    style={{
                      color: "#767676",
                      fontWeight: "bolder",
                      fontSize: "1rem",
                    }}
                  >
                    Team
                  </Grid.Column>
                  <Grid.Column>
                    {" "}
                    <List animated verticalAlign="middle">
                      {teamList}
                    </List>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <div
                      style={{
                        color: "#767676",
                        fontWeight: "bolder",
                        fontSize: "1rem",
                      }}
                    >
                      Description
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div
                      style={{
                        color: "grey",
                        fontSize: "1rem",
                      }}
                    >
                      {project.wiki ? parse(project.wiki) : "Not Available"}
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column
                    style={{
                      color: "#767676",
                      fontWeight: "bolder",
                      fontSize: "1rem",
                    }}
                  >
                    Total Issues
                  </Grid.Column>
                  <Grid.Column
                    style={{
                      color: "grey",
                      fontSize: "1rem",
                    }}
                  >
                    {project.total_bugs}
                    <Icon name="bug" />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Row>
            <Grid.Row columns={1}>
              <IssueGroup issues={project.bugs} showproj={false} />
            </Grid.Row>
            {project.total_bugs > project.bugs.length && (
              <Grid.Row centered>
                <Button style={{ minWidth: "40%" }} color="orange">
                  See All
                </Button>
              </Grid.Row>
            )}
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

export default ProjectDetail;
