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

export class AddProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };

    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

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
                    type="text"
                    name="prodPrice"
                    placeholder="Price"
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
