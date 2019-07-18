import React, { Component } from "react";
import {
  Form,
  Button,
  Header,
  Modal,
  Input,
  Message,
  Segment
} from "semantic-ui-react";
import axios from "axios";

export class EditStoreModal extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };

    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleSubmit = event => {
    event.preventDefault();
    //alert(event.target.storeName.value);
    axios({
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      params: {
        id: event.target.storeId.value,
        storeName: event.target.storeName.value,
        storeAddress: event.target.storeAddress.value
      },
      url: "https://localhost:5001/store/EditStores"
    })
      .then(res => res.json())
      .then(
        result => {
          // alert("result");
          <Message positive>
            <Message.Header>{result}</Message.Header>
          </Message>;
        },
        error => {
          //alert("Failed");
          <Message negative>
            <Message.Header>Sorry unable to add</Message.Header>
          </Message>;
        }
      );
  };

  render() {
    const { open } = this.state;
    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size="small"
        trigger={<Button icon="edit" content="Edit" primary />}
        closeIcon
      >
        <Header icon="vcard" content="Edit Store" />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Segment>
              <Form.Group>
                <Form.Field>
                  <label>Id:</label>
                  <Input
                    type="text"
                    name="storeId"
                    required
                    disabled
                    defaultValue={this.props.storeId}
                    placeholder="Id"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Name:</label>
                  <Input
                    type="text"
                    name="storeName"
                    required
                    defaultValue={this.props.storeName}
                    placeholder="Name"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Address:</label>
                  <Input
                    type="text"
                    name="storeAddress"
                    required
                    placeholder="Address"
                    defaultValue={this.props.storeAddress}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <Button
                  type="submit"
                  color="primary"
                  icon="upload"
                  content="Update"
                />
                <Button
                  type="cancel"
                  color="red"
                  icon="remove"
                  content="Cancel"
                  onClick={this.close}
                />
              </Form.Field>
            </Segment>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}
