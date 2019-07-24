import React, { Component } from "react";
import { Form, Button, Header, Modal, Input, Segment } from "semantic-ui-react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";

export class EditCustomerModal extends Component {
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
      url: "https://localhost:5001/customer/EditCustomers",
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      params: {
        id: event.target.cusId.value,
        customerName: event.target.cusName.value,
        customerAddress: event.target.cusAddress.value
      }
    })
      .then(res => res.json)
      .then(result =>
        // console.log("Customer Updated"),
        this.setState({
          open: false,
          snackbarOpen: true,
          snackbarMsg: "Customer Updated Successfully"
          //snackbarMsg: { result }
        })
      )
      .catch(err => {
        console.error("Fail to Update Customer");
      });
    this.setState({ open: false });
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
      </div>
    );
  }
}
