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

export class EditCustomerModal extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleSubmit = event => {
    event.preventDefault();
    //alert(event.target.cusName.value);
    axios({
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      params: {
        id: event.target.cusId.value,
        customerName: event.target.cusName.value,
        customerAddress: event.target.cusAddress.value
      },
      url: "https://localhost:5001/customer/EditCustomers"
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
        <Header icon="vcard" content="Edit Customer" />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Segment>
              <Form.Group>
                <Form.Field>
                  <label>Id:</label>
                  <Input
                    type="text"
                    name="cusId"
                    required
                    disabled
                    defaultValue={this.props.cusId}
                    placeholder="Id"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Name:</label>
                  <Input
                    type="text"
                    name="cusName"
                    required
                    defaultValue={this.props.cusName}
                    placeholder="Name"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Address:</label>
                  <Input
                    type="text"
                    name="cusAddress"
                    required
                    placeholder="Address"
                    defaultValue={this.props.cusAddress}
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
