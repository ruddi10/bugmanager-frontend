import React, { Component } from "react";
import errorpic from "../samplepics/internal-server-error.jpg";
import { Image } from "semantic-ui-react";
class ServerError extends Component {
  state = {};
  render() {
    return <Image src={errorpic} fluid />;
  }
}

export default ServerError;
