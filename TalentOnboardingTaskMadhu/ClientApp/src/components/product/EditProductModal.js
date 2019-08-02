import React, { Component } from "react";
import { Form, Button, Header, Modal, Input, Segment } from "semantic-ui-react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";

export class EditProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    // for prodName
    if (fields["prodName"] === "") {
      formIsValid = false;
      errors["prodName"] = "*Please edit Product name.";
    }

    if (typeof fields["prodName"] !== "undefined") {
      if (!fields["prodName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["prodName"] = "*Please enter alphabet characters only.";
      }
    }

    // Product Price

    if (fields["prodPrice"] === "") {
      formIsValid = false;
      errors["prodPrice"] = "*Please edit product price.";
    }

    if (typeof fields["prodPrice"] !== "undefined") {
      if (!fields["prodPrice"].match(/^[0-9]*$/)) {
        formIsValid = false;
        errors["prodPrice"] = "*Please Price positive number only.";
      }
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
    //alert(event.target.prodName.value);
    // form validation part 3
    if (this.validateForm()) {
      let fields = {};
      fields["prodName"] = "";
      fields["prodPrice"] = "";
      this.setState({ fields: fields });
      // alert("Form submitted");
      axios({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        params: {
          id: event.target.prodId.value,
          productName: event.target.prodName.value,
          price: event.target.prodPrice.value
        },
        
        // url: "https://localhost:5001/product/EditProducts"
        url: "https://madhutalent.azurewebsites.net/product/EditProducts"
      })
        .then(res => res.json)
        .then(result =>
          // console.log("Product Updated"),
          this.setState({
            open: false,
            snackbarOpen: true,
            snackbarMsg: "Product Updated Successfully"
            //snackbarMsg: { result }
          })
        )
        .catch(err => {
          console.error("Fail to Update Product");
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
          <Header icon="vcard" content="Edit Product" />
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Segment>
                <Form.Group>
                  <Form.Field>
                    <label>Id:</label>
                    <Input
                      type="text"
                      name="prodId"
                      required
                      disabled
                      defaultValue={this.props.prodId}
                      placeholder="Id"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Name:</label>
                    <Input
                      type="text"
                      name="prodName"
                      defaultValue={this.props.prodName}
                      // placeholder="Name"
                      // value={this.state.fields.prodName}
                      onChange={this.handleChange}
                      //required
                    />
                    <div style={{ color: "red" }}>
                      {this.state.errors.prodName}
                    </div>
                  </Form.Field>
                  <Form.Field>
                    <label>Price:</label>
                    <Input
                      type="number"
                      name="prodPrice"
                      defaultValue={this.props.prodPrice}
                      //value={this.state.fields.prodPrice}
                      onChange={this.handleChange}
                      //required
                    />
                    <div style={{ color: "red" }}>
                      {this.state.errors.prodPrice}
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
