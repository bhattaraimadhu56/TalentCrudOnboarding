import React, { Component } from "react";
import { Form, Button, Header, Modal, Input, Segment } from "semantic-ui-react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
export class AddSaleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cus: [],
      prod: [],
      stor: [],
      open: false,
      snackbarOpen: false,
      snackbarMsg: ""
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
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
  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };
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
      url: "https://localhost:5001/sale/CreateSales"
      // url: "https://localhost:5001/sale/EditSales"
    })
      // axios({
      //   method: "post",
      //   params: {
      //     id: null,
      //     name: event.target.salName.value,
      //     address: event.target.salAddress.value
      //   },
      //   url: "https://localhost:5001/sale/CreateSales"
      // })
      .then(res => res.json)
      .then(result =>
        // console.log("Customer Created"),
        this.setState({
          open: false,
          snackbarOpen: true,
          snackbarMsg: "Sale Added Successfully"
          //snackbarMsg: { result }
        })
      )
      .catch(err => {
        console.error("Fail to Add Sale");
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
          // trigger={this.props.showModal && <Button color="green" icon="plus" content="Add Sale"  />}
          trigger={<Button color="green" icon="plus" content="Add Sale" />}
          closeIcon
        >
          <Header icon="vcard" content="Add Sale Details" />
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Segment>
                <Form.Field>
                  <label>Customer:</label>

                  <select name="selectCustomer">
                    {this.state.cus.map(c => (
                      <option value={c.id} key={c.id}>
                        {c.customerName}
                      </option>
                    ))}
                  </select>
                </Form.Field>
                <Form.Field>
                  <label>Product:</label>
                  <select name="selectProduct">
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
                    required
                  />
                </Form.Field>

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
