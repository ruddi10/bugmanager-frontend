import React, { Component } from "react";
import queryString from "query-string";
import { Loader } from "semantic-ui-react";
import http from "../services/httpservice";

class Landing extends Component {
  async componentDidMount() {
    const { code } = queryString.parse(this.props.location.search);
    try {
      const { data } = await http.post(
        "http://127.0.0.1:8000/bugmanager/user/login/",
        {
          code,
        }
      );
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      this.props.onSuccess();
      this.props.history.push("/home");
    } catch (ex) {
      console.log(ex.config);
      if (ex.response) {
        const errors = ex.response.data.error
          ? ex.response.data.error
          : ex.response.data;

        this.props.onError(errors);
      } else {
        console.log(ex);
      }
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <Loader active size="massive">
        Loading
      </Loader>
    );
  }
}

export default Landing;
