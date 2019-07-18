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

export class AddCustomerModal extends Component {
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
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      params: {
        id: null,
        customerName: event.target.cusName.value,
        customerAddress: event.target.cusAddress.value
      },
      url: "https://localhost:5001/customer/CreateCustomers"
    })
      // axios({
      //   method: "post",
      //   params: {
      //     id: null,
      //     name: event.target.cusName.value,
      //     address: event.target.cusAddress.value
      //   },
      //   url: "https://localhost:5001/customer/CreateCustomers"
      // })
      .then(res => res.json())
      .then(
        result => {
          alert("Data Added Successfully");
          // <Message positive>
          //   <Message.Header>{result}</Message.Header>
          // </Message>;
        },
        error => {
          alert("Sorry unsuccessful ");
          // <Message negative>
          //   <Message.Header>Sorry unable to add</Message.Header>
          // </Message>;
          <Message positive>
            <Message.Header>You are eligible for a reward</Message.Header>
            <p>Sorry unsuccessful You are eligible for a reward</p>
          </Message>;
          <p>Sorry unsuccessful You are eligible for a reward</p>;
          alert("Sorry unsuccessful A");
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
        size="tiny"
        // trigger={this.props.showModal && <Button color="green" icon="plus" content="Add Customer"  />}
        trigger={<Button color="green" icon="plus" content="Add Customer" />}
        closeIcon
      >
        <Header icon="vcard" content="Add Customer" />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Segment>
              <Form.Group>
                <Form.Field>
                  <label>Name:</label>
                  <Input
                    type="text"
                    name="cusName"
                    placeholder="Name"
                    required
                  />
                </Form.Field>
                <Form.Field>
                  <label>Address:</label>
                  <Input
                    type="text"
                    name="cusAddress"
                    placeholder="Address"
                    required
                  />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <Button type="submit" color="green" icon="add" content="Add" />
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
