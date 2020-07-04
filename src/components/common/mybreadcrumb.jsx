import React, { Component, Fragment } from "react";
import { Breadcrumb } from "semantic-ui-react";
import { Link } from "react-router-dom";
class MyBreadcrumb extends Component {
  state = {};
  render() {
    const { sections } = this.props;
    const content = sections.map((section) => (
      <Fragment>
        <Breadcrumb.Section
          key={section.key}
          link={section.link}
          active={section.active}
          as={section.link ? Link : "div"}
          to={section.to}
        >
          {section.content}
        </Breadcrumb.Section>
        {section.active || <Breadcrumb.Divider>{"/"}</Breadcrumb.Divider>}
      </Fragment>
    ));
    return (
      <Breadcrumb size="massive" className="mybreadcrumb">
        {content}
      </Breadcrumb>
    );
  }
}

export default MyBreadcrumb;
