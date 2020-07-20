import React, { Component } from "react";
import { Image, Container } from "semantic-ui-react";
import notfound from "../samplepics/notfound.jpg";
class NotFound extends Component {
  render() {
    return <Image src={notfound} fluid />;
  }
}

export default NotFound;
