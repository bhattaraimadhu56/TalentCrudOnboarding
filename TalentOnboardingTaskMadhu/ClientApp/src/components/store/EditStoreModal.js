import React, { Component } from "react";
import { Form, Button, Header, Modal, Input, Segment } from "semantic-ui-react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";

export class EditStoreModal extends Component {
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
    // for storeName
    if (fields["storeName"] === "") {
      formIsValid = false;
      errors["storeName"] = "*Please edit store name.";
    }

    if (typeof fields["storeName"] !== "undefined") {
      if (!fields["storeName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["storeName"] = "*Please enter alphabet characters only.";
      }
    }

    //for  storeAddress
    if (fields["storeAddress"] === "") {
      formIsValid = false;
      errors["storeAddress"] = "*Please edit store address.";
    }

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
    //alert(event.target.storeName.value);
    if (this.validateForm()) {
      let fields = {};
      fields["storeName"] = "";
      fields["storeAddress"] = "";
      this.setState({ fields: fields });
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
        
        // url: "https://localhost:5001/store/EditStores"
        url: "https://madhutalent.azurewebsites.net/store/EditStores"
      })
        .then(res => res.json)
        .then(result =>
          // console.log("Store Updated"),
          this.setState({
            open: false,
            snackbarOpen: true,
            snackbarMsg: "Store Updated Successfully"
            //snackbarMsg: { result }
          })
        )
        .catch(err => {
          console.error("Fail to Update Store");
        });
      this.setState({ open: false });
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
                      defaultValue={this.props.storeName}
                      // value={this.state.fields.storeName}
                      onChange={this.handleChange}
                      // required
                    />
                    <div style={{ color: "red" }}>
                      {this.state.errors.storeName}
                    </div>
                  </Form.Field>
                  <Form.Field>
                    <label>Address:</label>
                    <Input
                      type="text"
                      name="storeAddress"
                      placeholder="Address"
                      defaultValue={this.props.storeAddress}
                      //value={this.state.fields.storeAddress}
                      onChange={this.handleChange}
                      // required
                    />
                    <div style={{ color: "red" }}>
                      {this.state.errors.storeAddress}
                    </div>
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
