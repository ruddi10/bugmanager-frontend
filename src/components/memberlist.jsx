import React, { Component } from "react";
import {
  Loader,
  Table,
  Container,
  Divider,
  Icon,
  Popup,
  Segment,
  Header,
  Image,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/helperFunctions";

class MemberTable extends Component {
  render() {
    const { users } = this.props;
    const list = users.results.map((user) => (
      <Table.Row
        style={{
          boxShadow:
            "0 0 0 1px #d4d4d5, 0 2px 0 0 #f2711c, 0 1px 3px 0 #d4d4d5",
        }}
        key={user.id}
      >
        <Table.Cell>
          {/* <Link
            to={user.id == getCurrentUser() ? "/home" : `/member/${user.id}`}
            style={{
              cursor: "pointer",
              borderTop: "0",
              marginTop: "0.4rem",
              fontWeight: "bold",
              color: "black",
            }}
          >
            {user.profile.full_name}
          </Link>
          <div
            style={{ color: "grey", fontSize: "0.9rem", fontWeight: "normal" }}
          >{`@ ${user.username}`}</div> */}

          <Header as="h4" image>
            <Image src={user.profile.profilepic} rounded size="mini" />
            <Header.Content
              as={Link}
              to={user.id == getCurrentUser() ? "/home" : `/member/${user.id}`}
              style={{
                cursor: "pointer",
                borderTop: "0",
                marginTop: "0.4rem",
                fontWeight: "bold",
                color: "black",
              }}
            >
              {user.profile.full_name}
              <Header.Subheader>{`@ ${user.username}`}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>{user.profile.enrolment_number}</Table.Cell>
        <Table.Cell>{user.profile.email}</Table.Cell>
        <Table.Cell>{user.is_superuser ? "Admin" : "Member"}</Table.Cell>
        {this.props.user.is_superuser && (
          <Table.Cell>
            <Popup
              position="bottom left"
              on={["click"]}
              basic
              trigger={<Icon name="ellipsis horizontal" />}
            >
              <Popup.Content>
                <Segment.Group style={{ border: "0" }}>
                  <Segment
                    style={{
                      fontSize: "0.9rem",
                      border: "0",
                      fontWeight: "bold",
                    }}
                  >
                    <Icon name="user delete" color="red" /> Disable
                  </Segment>
                  <Segment
                    style={{
                      fontSize: "0.9rem",
                      border: "0",
                      fontWeight: "bold",
                    }}
                  >
                    <Icon name="chevron up" color="green" /> Make Admin
                  </Segment>
                </Segment.Group>
              </Popup.Content>
            </Popup>
          </Table.Cell>
        )}
      </Table.Row>
    ));
    return (
      <Container>
        <Table padded className="usertable">
          <Table.Header>
            <Table.Row style={{ color: "#767676" }}>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Enrollment Number</Table.HeaderCell>
              <Table.HeaderCell>E-mail address</Table.HeaderCell>
              <Table.HeaderCell>Designation</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{list}</Table.Body>
        </Table>
      </Container>
    );
  }
}

export default MemberTable;
