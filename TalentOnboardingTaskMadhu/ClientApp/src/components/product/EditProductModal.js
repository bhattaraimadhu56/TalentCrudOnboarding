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

export class EditProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleSubmit = event => {
    event.preventDefault();
    //alert(event.target.prodName.value);
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
      url: "https://localhost:5001/product/EditProducts"
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
                    required
                    defaultValue={this.props.prodName}
                    placeholder="Name"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Price:</label>
                  <Input
                    type="text"
                    name="prodPrice"
                    required
                    placeholder="Price"
                    defaultValue={this.props.prodPrice}
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
