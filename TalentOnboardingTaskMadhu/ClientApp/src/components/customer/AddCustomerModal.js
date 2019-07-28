import React, { Component } from "react";
import { Form, Button, Header, Modal, Input, Segment } from "semantic-ui-react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
export class AddCustomerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // step 0
      fields: {},
      errors: {},
      open: false,
      snackbarOpen: false,
      snackbarMsg: ""
    };
  } // end of constructor

  //for validation part 1
  handleChange = e => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
    this.validateForm();
  };
  // for validation part 2
  validateForm = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    // for cusName
    if (!fields["cusName"]) {
      formIsValid = false;
      errors["cusName"] = "*Please enter Customer name.";
    }

    if (typeof fields["cusName"] !== "undefined") {
      if (!fields["cusName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["cusName"] = "*Please enter alphabet characters only.";
      }
    }

    //for  cusAddress
    if (!fields["cusAddress"]) {
      formIsValid = false;
      errors["cusAddress"] = "*Please enter Customer address.";
    }

    // if (typeof fields["cusAddress"] !== "undefined") {
    //   if (!fields["cusAddress"].match(/^[a-zA-Z ]*$/)) {
    //     formIsValid = false;
    //     errors["cusAddress"] = "*Please enter alphabet characters only.";
    //   }
    // }

    // if (!fields["price"]) {
    //   formIsValid = false;
    //   errors["price"] = "*Please enter product price.";
    // }

    // if (typeof fields["price"] !== "undefined") {
    //   if (!fields["price"].match(/^[0-9]*$/)) {
    //     formIsValid = false;
    //     errors["price"] = "*Please enter number only.";
    //   }
    // }

    this.setState({
      errors: errors
    });
    return formIsValid;
  };

  // end validation part 2

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    //alert(event.target.cusName.value);
    // form validation part 3
    if (this.validateForm()) {
      let fields = {};
      fields["cusName"] = "";
      fields["cusAddress"] = "";
      this.setState({ fields: fields });
      // alert("Form submitted");
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
    }
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
            <Form method="POST" onSubmit={this.handleSubmit}>
              <Segment>
                <Form.Group>
                  <Form.Field>
                    <label>Name:</label>
                    <Input
                      type="text"
                      name="cusName"
                      //placeholder="Name"
                      // value={this.state.fields.cusName}
                      onChange={this.handleChange}
                      // required
                    />
                    <div style={{ color: "red" }}>
                      {this.state.errors.cusName}
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <label>Address:</label>
                    <Input
                      type="text"
                      name="cusAddress"
                      value={this.state.fields.cusAddress}
                      onChange={this.handleChange}
                      //required
                    />
                    <div style={{ color: "red" }}>
                      {this.state.errors.cusAddress}
                    </div>
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
