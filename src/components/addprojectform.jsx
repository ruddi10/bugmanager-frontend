import React, { Component } from "react";
import { Form, Loader, Container, Header, Message } from "semantic-ui-react";
import http from "../services/httpservice";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";
import _ from "lodash";
import Forms from "./common/forms";

const Joi = require("@hapi/joi");

class AddProjectForm extends Forms {
  state = {
    data: {
      title: "",
      team: [],
      is_deployed: undefined,
      wiki: "",
    },
    useroptions: [],
    loading: true,
    errors: {},
    responseError: null,
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
      const response = await http.post(
        `http://127.0.0.1:8000/bugmanager/project/`,
        this.state.data
      );
      console.log(response);
      if (response.status == 201) {
        this.props.history.replace(`/project/${response.data.id}`);
      }
    } catch (err) {
      console.log(err.response);
      this.setState({ responseError: true });
      toast.error("Check Submission");
    }
  };
  async componentDidMount() {
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
        <Header className="formheading">New Project</Header>
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
            onChange={this.handleChange}
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
          />

          <Form.Field>
            <label>Description</label>
            <CKEditor
              editor={ClassicEditor}
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
