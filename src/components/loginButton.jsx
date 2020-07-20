import React from "react";
import Background from "../samplepics/9.png";
import logo from "../samplepics/bug.png";
import { Button, Header, Segment, Image } from "semantic-ui-react";
import omni from "../samplepics/omni.png";
const LoginButton = () => {
  return (
    <div
      className="Loginpage"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div style={{ flex: "1.3", alignSelf: "center" }}>
        <img src={logo} style={{ mixBlendMode: "lighten", width: "100%" }} />
      </div>
      <div style={{ flex: "1", alignSelf: "center", padding: "3rem" }}>
        <Header
          as="h1"
          style={{
            backgound: "transparent",
            color: "white",
            fontSize: "3rem",
            fontWeight: "bolder",
          }}
        >
          Bugzilla
        </Header>
        <p
          style={{
            backgound: "transparent",
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bolder",
          }}
        >
          Amazing and a user friendly app for easy management and tracking of
          bugs in various softwares, fecilitatig smoother experience......
        </p>
        <a href="https://internet.channeli.in/oauth/authorise/?client_id=bJJ0mJGuqBJRfU45hBECxOFO6XkvqD3HuuMAajB4&redirect_url=http://localhost:3000/landing">
          <Button color="pink" size="large">
            <Image
              circular={false}
              src={omni}
              avatar
              style={{ borderRadius: "0" }}
            />{" "}
            Login With Omniport
          </Button>
        </a>
      </div>
    </div>
  );
};

export default LoginButton;
