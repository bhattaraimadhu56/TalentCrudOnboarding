import React, { Component } from "react";
import { Form, Button, Header, Modal, Input, Segment } from "semantic-ui-react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
export class AddSaleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      cus: [],
      prod: [],
      stor: [],
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
  };
  // for validation part 2
  validateForm = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    // for cusName
    if (!fields["selectDate"]) {
      formIsValid = false;
      errors["selectDate"] = "*Please enter date of sale.";
    }

    // if (typeof fields["selectDate"] !== "undefined") {
    //   if (!fields["selectDate"].match(/^[a-zA-Z ]*$/)) {
    //     formIsValid = false;
    //     errors["selectDate"] = "*Please enter alphabet characters only.";
    //   }
    // }

    this.setState({
      errors: errors
    });
    return formIsValid;
  };

  // end validation part 2
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
    if (this.validateForm()) {
      let fields = {};
      fields["selectDate"] = "";
      this.setState({ fields: fields });
      // alert("Form submitted");
      axios({
        url: "https://localhost:5001/sale/CreateSales",
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
            .split("/")
            .reverse()
            .join("-")
        }
      })
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
                    value={this.state.fields.selectDate}
                    onChange={this.handleChange}
                    // required
                  />
                  <div style={{ color: "red" }}>
                    {this.state.errors.selectDate}
                  </div>
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
