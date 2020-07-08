import React, { Component } from "react";
import { Image, Container } from "semantic-ui-react";
import notfound from "../sample pics/notfound.jpg";
class NotFound extends Component {
  render() {
    return <Image src={notfound} fluid />;
  }
}

export default NotFound;
