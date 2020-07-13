import React, { Component, Fragment } from "react";
import {
  Loader,
  Container,
  Grid,
  Segment,
  Header,
  Label,
  Modal,
  Form,
  Button,
  Icon,
} from "semantic-ui-react";
import http from "../services/httpservice";
import MyBreadcrumb from "./common/mybreadcrumb";
import MyModal from "./mymodal";
import { toast } from "react-toastify";

class IssueDetail extends Component {
  state = {
    loading: true,
    issue: {},
    data: {},
    modalOpen: false,
    teamOptions: [],
    assignmodalOpen: false,
  };
  async componentDidMount() {
    const { data: issue } = await http.get(
      `http://127.0.0.1:8000/bugmanager/issues/${this.props.match.params.id}/`
    );
    let data = {};
    data.status = issue.status;
    data.priority = issue.priority;
    const teamOption = issue.team_member;
    const teamOptions = teamOption.map((member) => {
      return { key: member.id, text: member.name, value: member.id };
    });
    const assigned_to = issue.assigned_to;
    this.setState({ issue, loading: false, data, teamOptions, assigned_to });
  }
  colors = {
    Pending: "red",
    Resolved: "green",
    "To Be Disscussed": "grey",
    "In Process": "blue",
  };
  options = [
    { key: "h", text: "High", value: "High" },
    { key: "l", text: "Low", value: "Low" },
    { key: "m", text: "Moderate", value: "Moderate" },
  ];
  status = [
    { key: "p", text: "Pending", value: "Pending" },
    { key: "tbd", text: "To Be Disscussed", value: "To Be Disscussed" },
    { key: "r", text: "Resolved", value: "Resolved" },
    { key: "ip", text: "In Process", value: "In Process" },
  ];
  isAdminOrTeam = (user, issue) => {
    const isTeam = issue.team_member.filter((member) => member.id == user.id);
    return user.is_superuser || Boolean(isTeam.length);
  };
  isReporter = (user, issue) => user.id == issue.get_reporter.id;

  handleOpen = (property) => this.setState({ [property]: true });

  handleClose = (property) => this.setState({ [property]: false });
  handleDelete = async () => {
    try {
      const response = await http.delete(
        `http://127.0.0.1:8000/bugmanager/issues/${this.props.match.params.id}/`
      );
      console.log(response);
      toast.success("Successfully Deleted");
      this.props.history.replace(`/issues`);
    } catch (error) {
      console.log(error.response);
      if (error.response.status == 403) {
        toast.error("Not Allowed");
      } else {
        toast.error("Request Failed");
      }
    }
  };
  handleEdit = async () => {
    try {
      const response = await http.patch(
        `http://127.0.0.1:8000/bugmanager/issues/${this.props.match.params.id}/`,

        this.state.data
      );
      const issue = { ...this.state.issue };
      issue.status = JSON.parse(response.config.data).status;
      issue.priority = JSON.parse(response.config.data).priority;
      toast.success("Changed Successfully");
      this.setState({ issue });
    } catch (error) {
      toast.error("Bad Request");
      let data = {};
      data.status = this.state.issue.status;
      data.priority = this.state.issue.priority;
      this.setState({ data });
    }
    this.setState({ modalOpen: false });
  };
  handleAssign = async () => {
    try {
      const response = await http.patch(
        `http://127.0.0.1:8000/bugmanager/issues/${this.props.match.params.id}/`,

        { assigned_to: this.state.assigned_to }
      );
      console.log(response);
      this.setState({ issue: response.data });
      toast.success("Assigned Successfully");
    } catch (err) {
      console.log(err.response);
      if (err.response.data && err.response.data.non_field_errors) {
        toast.error(err.response.data.non_field_errors[0]);
      } else {
        toast.error("Bad Request");
      }
      const assigned_to = this.state.issue.assigned_to;
      this.setState({ assigned_to });
    }
    this.setState({ assignmodalOpen: false });
  };
  handleChange = (e, info) => {
    const data = { ...this.state.data };
    data[info.name] = info.value;
    this.setState({ data });
  };
  handleAssignChange = (e, info) => {
    const assigned_to = info.value;
    this.setState({ assigned_to });
  };
  isReassign = (user, issue) => {
    if (issue.assigned_to) {
      const isAssigner = issue.assigned_by == user.id;
      return user.is_superuser || isAssigner;
    }
    return true;
  };
  render() {
    if (this.state.loading) return <Loader active size="massive" />;
    const { state } = this.props.location;
    let section = state
      ? state.sections
      : [
          {
            key: "issue",
            content: "Issues",
            link: true,
            //active: false,
            to: "/issues",
          },
        ];

    const { issue } = this.state;
    const { user } = this.props;
    let sections = [...section];
    sections.push({
      key: issue.id,
      content: issue.heading,
      active: true,
      link: false,
    });
    const taglist = issue.tags.map((tag) => <Label>{tag}</Label>);
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
                  {issue.heading}
                </Header>
                <Label color={this.colors[issue.status]} horizontal>
                  {issue.status}
                </Label>
              </Segment>
              <div>
                {(this.isAdminOrTeam(user, issue) ||
                  this.isReporter(user, issue)) && (
                  <Modal
                    trigger={
                      <Button
                        onClick={() => this.handleOpen("modalOpen")}
                        secondary
                      >
                        <Icon name="edit" color="white" />
                        Edit Issue
                      </Button>
                    }
                    open={this.state.modalOpen}
                    onClose={() => this.handleClose("modalOpen")}
                  >
                    <Modal.Header>Edit Issue</Modal.Header>
                    <Modal.Content>
                      <Form>
                        {" "}
                        {this.isAdminOrTeam(user, issue) && (
                          <Form.Select
                            fluid
                            label="Status"
                            options={this.status}
                            placeholder="Status"
                            onChange={this.handleChange}
                            name="status"
                            required
                            value={this.state.data.status}
                          />
                        )}{" "}
                        <Form.Select
                          fluid
                          label="Priority"
                          options={this.options}
                          placeholder="Priority"
                          onChange={this.handleChange}
                          required
                          name="priority"
                          value={this.state.data.priority}
                        />{" "}
                        <Form.Button onClick={this.handleEdit} color="orange">
                          Submit
                        </Form.Button>
                      </Form>
                    </Modal.Content>
                  </Modal>
                )}
                {((!this.state.assigned_to &&
                  this.isAdminOrTeam(user, issue)) ||
                  (this.isReassign(user, issue) &&
                    this.isAdminOrTeam(user, issue))) && (
                  <Modal
                    trigger={
                      <Button
                        onClick={() => this.handleOpen("assignmodalOpen")}
                        positive
                      >
                        <Icon name="tasks" color="white" />
                        {this.state.assigned_to
                          ? "Reassign Issue"
                          : "Assign Issue"}
                      </Button>
                    }
                    open={this.state.assignmodalOpen}
                    onClose={() => this.handleClose("assignmodalOpen")}
                  >
                    <Modal.Header>
                      {" "}
                      {this.state.assigned_to
                        ? "Reassign Issue"
                        : "Assign Issue"}
                    </Modal.Header>
                    <Modal.Content>
                      <Form>
                        {" "}
                        <Form.Select
                          fluid
                          label="Assign To"
                          options={this.state.teamOptions}
                          placeholder="Assign To"
                          onChange={this.handleAssignChange}
                          name="assigned_to"
                          required
                          value={this.state.assigned_to}
                        />{" "}
                        <Form.Button onClick={this.handleAssign} color="orange">
                          Assign
                        </Form.Button>
                      </Form>
                    </Modal.Content>
                  </Modal>
                )}

                {!this.isReassign(user, issue) &&
                  this.isAdminOrTeam(user, issue) && (
                    <Button size="medium" style={{ cursor: "default" }}>
                      <Icon name="check" />
                      Already Assigned
                    </Button>
                  )}

                {(this.isAdminOrTeam(user, issue) ||
                  this.isReporter(user, issue)) && (
                  <MyModal
                    trig={(a) => (
                      <Button negative onClick={a}>
                        {" "}
                        <Icon name="trash" color="white" />
                        Delete Issue
                      </Button>
                    )}
                    handleClick={this.handleDelete}
                    cont=" Do you really want to delete this item? This change cannot be undone."
                  />
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
                    Priority
                  </Grid.Column>
                  <Grid.Column
                    style={{
                      color: "grey",
                      fontSize: "1rem",
                    }}
                  >
                    {issue.priority}
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
                    Tags
                  </Grid.Column>
                  <Grid.Column
                    style={{
                      color: "grey",
                      fontSize: "1rem",
                    }}
                  >
                    <Label.Group color="blue">{taglist}</Label.Group>
                  </Grid.Column>
                </Grid.Row>
                {/* <Grid.Row>
                  <Grid.Column
                    style={{
                      color: "#767676",
                      fontWeight: "bolder",
                      fontSize: "1rem",
                    }}
                  >
                    Team
                  </Grid.Column> */}
              </Grid>
            </Grid.Row>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

export default IssueDetail;
