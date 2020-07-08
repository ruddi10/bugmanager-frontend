import React, { Component } from "react";
import { Modal, Icon, Button, Header } from "semantic-ui-react";
class MyModal extends Component {
  state = { modalOpen: false };

  render() {
    return (
      <Modal
        trigger={this.props.trig}
        open={this.props.modalOpen}
        onClose={this.props.handleClose}
        size="small"
      >
        <Header icon="exclamation triangle red" content="Are You Sure ?" />
        <Modal.Content>{this.props.cont}</Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.handleClose}>Cancel</Button>
          <Button color="red" onClick={this.props.handleDelete}>
            Sure
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default MyModal;
