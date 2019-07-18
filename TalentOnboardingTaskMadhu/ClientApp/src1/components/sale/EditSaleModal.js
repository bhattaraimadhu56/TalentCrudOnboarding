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

export class EditSaleModal extends Component {
  constructor(props) {
    super(props);
    this.state = { cus: [], prod: [], stor: [], open: false };
  }
  componentDidMount() {
    fetch("https://localhost:5001/customer/getallcustomers")
      .then(response => response.json())
      .then(data => {
        this.setState({ cus: data });
      });
    fetch("https://localhost:5001/product/getallproducts")
      .then(response => response.json())
      .then(data => {
        this.setState({ prod: data });
      });
    fetch("https://localhost:5001/store/getallstores")
      .then(response => response.json())
      .then(data => {
        this.setState({ stor: data });
      });
  }
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleSubmit = event => {
    event.preventDefault();
    //alert(event.target.salName.value);
    axios({
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      params: {
        id: null,
        productId: event.target.selectProduct.value,
        customerId: event.target.selectCustomer.value,
        storeId: event.target.selectStore.value,
        dateSold: event.target.selectDate.value
      },
      url: "https://localhost:5001/sale/EditSales"
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
        <Header icon="vcard" content="Edit Sale" />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Segment>
              <Form.Field>
                <label>Customer:</label>

                <select
                  name="selectCustomer"
                  defaultvalue={this.props.customerName}
                >
                  {this.state.cus.map(c => (
                    <option value={c.id} required key={c.id}>
                      {c.customerName}
                      {/* {c.customerName === this.props.customerName
                        ? c.customerName
                        : this.props.customerName} */}
                    </option>
                  ))}
                </select>
              </Form.Field>
              <Form.Field>
                <label>Product:</label>
                <select
                  selected
                  name="selectProduct"
                  defaultvalue={this.props.productName}
                >
                  {this.state.prod.map(p => (
                    <option value={p.id} key={p.id}>
                      {p.productName}
                    </option>
                  ))}
                </select>
              </Form.Field>
              <Form.Field>
                <label>Store:</label>
                <select name="selectStore">
                  {this.state.stor.map(s => (
                    <option value={s.id} key={s.id}>
                      {s.storeName}
                    </option>
                  ))}
                </select>
              </Form.Field>
              <Form.Field>
                <label>Sold Date:</label>
                <Input
                  type="date"
                  name="selectDate"
                  required
                  placeholder="date"
                  Value={this.props.dateSold}
                />
              </Form.Field>

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
