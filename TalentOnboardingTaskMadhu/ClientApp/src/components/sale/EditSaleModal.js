import React, { Component } from "react";
import { Form, Button, Header, Modal, Input, Segment } from "semantic-ui-react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
export class EditSaleModal extends Component {
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
      snackbarMsg: "",
      customerId: 1,
      productId: 1,
      storeId: 1,
      customerSelectClick: false,
      productSelectClick: false,
      storeSelectClick: false
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
    // for Date
    if (fields["selectDate" === ""]) {
      formIsValid = false;
      errors["selectDate"] = "*Please edit date of sale.";
    }
    // for Customer
    if (this.state.customerSelectClick === false) {
      formIsValid = false;
      errors["selectCustomer"] =
        " Please either select same customer or choose different ";
    }
    // for Product
    if (this.state.productSelectClick === false) {
      formIsValid = false;
      errors["selectProduct"] =
        "Please either select same product or choose different ";
    }
    //for Store
    if (this.state.storeSelectClick === false) {
      formIsValid = false;
      errors["selectStore"] =
        "Please either select same store or choose different ";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  };

  // end validation part 2
  componentDidMount() {
    this.refreshList();
  }
  componentDidUpdate() {
    this.refreshList();
  }
  refreshList = () => {
    fetch("https://madhutalent.azurewebsites.net/customer/getallcustomers")
      .then(response => response.json())
      .then(data => {
        this.setState({ cus: data });
      });
    fetch("https://madhutalent.azurewebsites.net/product/getallproducts")
      .then(response => response.json())
      .then(data => {
        this.setState({ prod: data });
      });
    fetch("https://madhutalent.azurewebsites.net/store/getallstores")
      .then(response => response.json())
      .then(data => {
        this.setState({ stor: data });
      });
  };
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    //alert(event.target.salName.value);
    // alert(event.target.selectDate.value);

    if (this.validateForm()) {
      let fields = {};
      fields["selectDate"] = "";
      this.setState({ fields: fields });
      // alert("Form submitted");
      axios({
        url: "https://madhutalent.azurewebsites.net/sale/EditSales",
        // url: "https://madhutalent.azurewebsites.net/store/EditStores",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        params: {
          id: event.target.salId.value,
          //productId: event.target.selectProduct.value,
          productId: this.state.productId,
          // customerId: event.target.selectCustomer.value,
          customerId: this.state.customerId,
          storeId: this.state.storeId,
          dateSold: event.target.selectDate.value
        }
      })
        .then(res => res.json)
        .then(result =>
          // console.log("Sale Updated"),
          this.setState({
            open: false,
            snackbarOpen: true,
            snackbarMsg: "Sale Updated Successfully"
            //snackbarMsg: { result }
          })
        )
        .catch(err => {
          // console.error("Fail to Update Sale");
          alert("Fail to update Sale ");
        });
      this.setState({ open: false });
    }
  };

  CaptureCustomerId = cId => {
    // to make sure customerSelectClick is clicked  we have pass it here
    // after validation only data will send to backend
    this.setState({ customerId: cId, customerSelectClick: true });
    // alert(cId);
  };
  CaptureProductId = cId => {
    this.setState({ productId: cId, productSelectClick: true });
    //alert(cId);
  };
  CaptureStoreId = cId => {
    this.setState({ storeId: cId, storeSelectClick: true });
    //alert(cId);
  };
  // /////////////////////////////111111111111111111111111111111111111
  render() {
    const { open, customerId } = this.state;
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
          <Header icon="vcard" content="Edit Sale" />
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Segment>
                <Form.Field>
                  <label>Id:</label>
                  <Input
                    type="text"
                    name="salId"
                    required
                    disabled
                    defaultValue={this.props.salId}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Customer:</label>
                  <select
                    name="selectCustomer"
                    defaultValue={this.props.customerName}
                  >
                    {this.state.cus.map(c => (
                      <option
                        key={c.id}
                        value={c.customerName}
                        onClick={() => this.CaptureCustomerId(c.id)}
                      >
                        {c.customerName}
                      </option>
                    ))}
                  </select>{" "}
                  <div style={{ color: "red" }}>
                    {this.state.errors.selectCustomer}
                  </div>
                </Form.Field>
                <Form.Field>
                  <label>Product:</label>
                  <select
                    name="selectProduct"
                    defaultValue={this.props.productName}
                  >
                    {this.state.prod.map(p => (
                      <option
                        key={p.id}
                        value={p.productName}
                        onClick={() => this.CaptureProductId(p.id)}
                      >
                        {p.productName}
                      </option>
                    ))}
                  </select>{" "}
                  <div style={{ color: "red" }}>
                    {this.state.errors.selectProduct}
                  </div>
                </Form.Field>
                <Form.Field>
                  <label>Store:</label>
                  <select
                    name="selectStore"
                    defaultValue={this.props.storeName}
                  >
                    {this.state.stor.map(s => (
                      <option
                        value={s.storeName}
                        key={s.id}
                        onClick={() => this.CaptureStoreId(s.id)}
                      >
                        {s.storeName}
                      </option>
                    ))}
                  </select>{" "}
                  <div style={{ color: "red" }}>
                    {this.state.errors.selectStore}
                  </div>
                </Form.Field>
                <Form.Field>
                  <label>Sold Date:</label>
                  <Input
                    type="date"
                    name="selectDate"
                    defaultValue={new Date(this.props.dateSold)
                      .toLocaleDateString("en-GB")
                      .split("/")
                      .reverse()
                      .join("-")}
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
                    color="primary"
                    icon="upload"
                    content="Update"
                    //  disabled={!this.state.formIsValid}
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
