import React, { Component } from "react";
import { Form, Button, Header, Modal, Input, Segment } from "semantic-ui-react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
export class AddCustomerModal extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, snackbarOpen: false, snackbarMsg: "" };
  } // end of constructor
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    //alert(event.target.cusName.value);
    axios({
      url: "https://localhost:5001/customer/CreateCustomers",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      params: {
        id: null,
        customerName: event.target.cusName.value,
        customerAddress: event.target.cusAddress.value
      }
    })
      .then(res => res.json)
      .then(result =>
        // console.log("Customer Created"),
        this.setState({
          open: false,
          snackbarOpen: true,
          snackbarMsg: "Customer Added Successfully"
          //snackbarMsg: { result }
        })
      )
      .catch(err => {
        console.error("Fail to Add Customer");
      });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.snackbarOpen}
          autoHideDuration={1500}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarMsg}</span>}
        />
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
                  <Button
                    type="submit"
                    color="green"
                    icon="add"
                    content="Add"
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
      </div>
    );
  }
}
