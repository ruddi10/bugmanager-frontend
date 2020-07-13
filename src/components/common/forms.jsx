import React, { Component } from "react";
class Forms extends Component {
  state = { data: {}, errors: {}, responseerror: null };
  handleChange = (e, info) => {
    let errors = { ...this.state.errors };
    delete errors[info.name];
    const data = { ...this.state.data };
    data[info.name] = info.value;
    this.setState({ data, errors });
  };

  validate = () => {
    const result = this.schema.validate(this.state.data, { abortEarly: false });
    if (result.error) {
      let errors = {};
      result.error.details.map((detail) => {
        errors[detail.path[0]] = detail.message;
      });
      this.setState({ errors });
      return null;
    }
    return 1;
  };
}

export default Forms;
