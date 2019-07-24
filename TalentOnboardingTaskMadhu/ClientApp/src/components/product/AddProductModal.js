import React, { Component } from "react";
import { Form, Button, Header, Modal, Input, Segment } from "semantic-ui-react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
export class AddProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    //alert(event.target.prodName.value);
    axios({
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      params: {
        id: null,
        productName: event.target.prodName.value,
        price: event.target.prodPrice.value
      },
      url: "https://localhost:5001/product/CreateProducts"
    })
      // axios({
      //   method: "post",
      //   params: {
      //     id: null,
      //     productName: event.target.prodName.value,
      //     price: event.target.prodPrice.value
      //   },
      //   url: "https://localhost:5001/product/CreateProducts"
      // })
      .then(res => res.json)
      .then(result =>
        // console.log("Customer Created"),
        this.setState({
          open: false,
          snackbarOpen: true,
          snackbarMsg: "Product Added Successfully"
          //snackbarMsg: { result }
        })
      )
      .catch(err => {
        console.error("Fail to Add Product");
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
          // trigger={this.props.showModal && <Button color="green" icon="plus" content="Add Product"  />}
          trigger={<Button color="green" icon="plus" content="Add Product" />}
          closeIcon
        >
          <Header icon="vcard" content="Add Product" />
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Segment>
                <Form.Group>
                  <Form.Field>
                    <label>Name:</label>
                    <Input
                      type="text"
                      name="prodName"
                      required
                      placeholder="Name"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Price:</label>
                    <Input
                      type="number"
                      name="prodPrice"
                      placeholder="Price"
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
