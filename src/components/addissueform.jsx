import React, { Component } from "react";
import Forms from "./common/forms";
import { Loader, Container, Header, Form, Message } from "semantic-ui-react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import _ from "lodash";

import http from "../services/httpservice";
import MyUploadAdapter, { MyCustomUploadAdapterPlugin } from "../myadapter";
const Joi = require("@hapi/joi");

class AddIssueForm extends Forms {
  state = {
    loading: true,
    tagOptions: {},
    projectOptions: {},
    data: {
      project: "",
      heading: "",
      tags: [],
      priority: "",
      description: "",
    },
    tagOptions: [],
    errors: {},
    responseError: null,
  };
  schema = Joi.object({
    project: Joi.number().required().label("Project"),
    heading: Joi.string().required().label("Heading"),
    tags: Joi.array().items(Joi.string().required()).required().label("Tags"),
    priority: Joi.string().allow("").label("Priority"),
    description: Joi.string().allow("").label("Description"),
  });
  options = [
    { key: "h", text: "High", value: "High" },
    { key: "l", text: "Low", value: "Low" },
    { key: "m", text: "Moderate", value: "Moderate" },
  ];
  handleEditor = (e, info) => {
    const data = { ...this.state.data };
    data.description = info.getData();
    this.setState({ data });
  };
  async componentDidMount() {
    if (this.props.location.state && this.props.location.state.project) {
      const { project } = this.props.location.state;
      const projectOptions = [
        {
          key: project.id,
          text: project.title,
          value: project.id,
        },
      ];
      const data = { ...this.state.data };
      data.project = project.id;
      this.setState({ data, projectOptions });
    } else {
      const { data: projects } = await http.get(
        "http://127.0.0.1:8000/bugmanager/project/?page_size=0"
      );
      const projectOptions = projects.map((project) => {
        return { key: project.id, text: project.title, value: project.id };
      });

      this.setState({ projectOptions });
    }
    const { data: tags } = await http.get(
      "http://127.0.0.1:8000/bugmanager/tags/"
    );
    const tagOptions = tags.map((tag) => {
      return { key: tag.id, value: tag.tagname, text: tag.tagname };
    });
    this.setState({ tagOptions, loading: false });
  }
  handleSubmit = async () => {
    if (!this.validate()) {
      return null;
    }
    try {
      let data = { ...this.state.data };
      if (!data.priority) delete data.priority;
      const response = await http.post(
        `http://127.0.0.1:8000/bugmanager/issues/`,
        data
      );
      toast.success("Successfully Reported");
      this.props.history.replace(`/project/${this.state.data.project}`);
    } catch (err) {
      if (err.response.status == 403) {
        toast.error("Not Allowed");
      } else {
        this.setState({ responseError: true });
        toast.error("Check Submission");
      }
    }
  };
  render() {
    console.log(this.csrftoken);
    return this.state.loading ? (
      <Loader active size="massive" />
    ) : (
      <Container className="Formcontainer">
        <Header className="formheading">Report Issue</Header>
        <Form
          onSubmit={this.handleSubmit}
          className="customform"
          size="small"
          warning={this.state.responseError}
        >
          <Form.Dropdown
            placeholder="Select Project"
            fluid
            label="Project Reported"
            search
            selection
            required
            name="project"
            disabled={
              this.props.location.state
                ? this.props.location.state.project
                : false
            }
            className="customDisable"
            value={this.state.data.project}
            onChange={this.handleChange}
            options={this.state.projectOptions}
            error={this.state.errors.project}
          />
          <Form.Input
            name="heading"
            fluid
            label="Issue Heading"
            placeholder="Name"
            required
            onChange={this.handleChange}
            value={this.state.data.heading}
            error={this.state.errors.heading}
          />
          <Form.Dropdown
            placeholder="Tags"
            fluid
            multiple
            search
            selection
            required
            label="Tags"
            options={this.state.tagOptions}
            onChange={this.handleChange}
            name="tags"
            value={this.state.data.tags}
            error={this.state.errors.tags}
          />
          <Form.Select
            fluid
            label="Priority"
            options={this.options}
            placeholder="Priority"
            onChange={this.handleChange}
            name="priority"
            value={this.state.data.priority}
            error={this.state.errors.priority}
          />
          <Form.Field>
            <label>Description</label>
            <CKEditor
              editor={ClassicEditor}
              data={this.state.data.description}
              onInit={(editor) => {
                editor.plugins.get("FileRepository").createUploadAdapter = (
                  loader
                ) => {
                  // Configure the URL to the upload script in your back-end here!
                  return new MyUploadAdapter(
                    loader,
                    "http://127.0.0.1:8000/bugmanager/images/"
                  );
                };
              }}
              config={{
                placeholder: "Some description of your bug",
                // extraPlugins: [MyCustomUploadAdapterPlugin],
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "blockQuote",
                  "link",
                  "imageUpload",
                  "imageStyle:full",
                  "imageStyle:side",
                  "|",
                  "imageTextAlternative",
                  "|",
                  "linkImage",
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
              name="description"
              error={this.state.errors.description}
            />
          </Form.Field>
          <Message
            warning
            header="Could you check your submission"
            list={[
              "Project,Heading and Tag must be provided",
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

export default AddIssueForm;
