import React, { Component } from "react";
import { Modal, Icon, Button, Header } from "semantic-ui-react";
class MyModal extends Component {
  state = { modalOpen: false };
  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });
  handleDelete = () => {
    this.setState({ modalOpen: false });
    this.props.handleClick();
  };

  render() {
    return (
      <Modal
        trigger={this.props.trig(this.handleOpen)}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="small"
      >
        <Header icon="exclamation triangle red" content="Are You Sure ?" />
        <Modal.Content>{this.props.cont}</Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button size="medium" color="red" onClick={this.handleDelete}>
            Sure
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default MyModal;
