import React, { Component } from "react";
import { Form, Loader, Container, Header, Message } from "semantic-ui-react";
import http from "../services/httpservice";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";
import _ from "lodash";
import Forms from "./common/forms";
// import ClassicEditor from "../assets/ckeditor5-build-classic/src/ckeditor";

const Joi = require("@hapi/joi");

class AddProjectForm extends Forms {
  state = {
    data: {
      title: "",
      team: [],
      is_deployed: false,
      wiki: "",
    },
    useroptions: [],
    loading: true,
    errors: {},
    responseError: null,
    heading: "New Project",
  };

  schema = Joi.object({
    title: Joi.string().required().label("Title"),
    team: Joi.array().items(Joi.number()).label("Team"),
    is_deployed: Joi.boolean().required().label("Status"),
    wiki: Joi.string().allow("").label("Description"),
  });

  options = [
    { key: "d", text: "Deployed", value: true },
    { key: "p", text: "Pending", value: false },
  ];

  handleSubmit = async (e) => {
    if (!this.validate()) {
      return null;
    }
    try {
      if (this.props.match.path == "/editproject") {
        const response = await http.put(
          `http://127.0.0.1:8000/bugmanager/project/${this.props.location.state.project}/`,
          this.state.data
        );
        toast.success("Successfully Updated");
        this.props.history.replace(
          `/project/${this.props.location.state.project}`
        );
      } else {
        const response = await http.post(
          `http://127.0.0.1:8000/bugmanager/project/`,
          this.state.data
        );
        console.log(response);
        if (response.status == 201) {
          toast.success("Successfully Created");
          this.props.history.replace(`/project/${response.data.id}`);
        }
      }
    } catch (err) {
      console.log(err.response);
      if (err.response.status == 403) {
        toast.error("Not Allowed");
      } else {
        this.setState({ responseError: true });
        toast.error("Check Submission");
      }
    }
  };
  async componentDidMount() {
    if (this.props.match.path == "/editproject") {
      if (!this.props.location.state || !this.props.location.state.project) {
        this.props.history.replace(`/notfound`);
        return;
      }
      const { data: project } = await http.get(
        `http://127.0.0.1:8000/bugmanager/project/${this.props.location.state.project}/`
      );
      this.setState({
        data: {
          title: project.title,
          team: project.team,
          is_deployed: project.is_deployed,
          wiki: project.wiki,
        },
        heading: "Edit Project",
      });
    }
    const { data: users } = await http.get(
      `http://127.0.0.1:8000/bugmanager/user/`
    );
    const useroptions = users.results.map((user) => {
      return { key: user.id, value: user.id, text: user.username };
    });

    this.setState({ useroptions, loading: false });
  }
  render() {
    return this.state.loading ? (
      <Loader active size="massive" />
    ) : (
      <Container className="Formcontainer">
        <Header className="formheading">{this.state.heading}</Header>
        <Form
          onSubmit={this.handleSubmit}
          className="customform"
          size="small"
          warning={this.state.responseError}
        >
          <Form.Input
            name="title"
            fluid
            error={this.state.errors.title}
            label="Project Title"
            placeholder="Title"
            required
            onChange={this.handleChange}
            value={this.state.data.title}
          />
          <Form.Dropdown
            placeholder="Team"
            fluid
            error={this.state.errors.team}
            multiple
            search
            selection
            label="Team"
            options={this.state.useroptions}
            onChange={this.handleChange}
            name="team"
            value={this.state.data.team}
          />
          <Form.Select
            fluid
            label="Status"
            error={this.state.errors.is_deployed}
            options={this.options}
            placeholder="Status"
            required
            onChange={this.handleChange}
            name="is_deployed"
            value={this.state.data.is_deployed}
          />

          <Form.Field>
            <label>Description</label>
            <CKEditor
              editor={ClassicEditor}
              data={this.state.data.wiki}
              config={{
                placeholder: "Some description of your project....",
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "blockQuote",
                  "link",
                  "numberedList",
                  "bulletedList",
                  "insertTable",
                  "tableColumn",
                  "tableRow",
                  "mergeTableCells",
                  "|",
                  "undo",
                  "redo",
                ],
              }}
              onChange={this.handleEditor}
              name="wiki"
              errors={this.state.errors.wiki}
            />
          </Form.Field>
          <Message
            warning
            header="Could you check your submission"
            list={[
              "Title and Status must be provided",
              "Make sure all fields are filled properly",
            ]}
          />
          <Form.Button disabled={!_.isEmpty(this.state.errors)} color="orange">
            Submit
          </Form.Button>
        </Form>
      </Container>
    );
  }
}

export default AddProjectForm;
