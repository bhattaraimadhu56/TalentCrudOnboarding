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
      sal: [],
      open: false,
      snackbarOpen: false,
      snackbarMsg: "",
      customerId: 1,
      productId: 1,
      storeId: 1
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
    if (fields["selectDate"] === "") {
      formIsValid = false;
      errors["selectDate"] = "*Please edit date of sale.";
    }

    // if (typeof fields["selectDate"] !== "undefined") {
    //   if (
    //     !fields["selectDate"].match(
    //       // /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
    //       /^ (0 ? [1 - 9] | [12][0 - 9] | 3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    //     )
    //   ) {
    //     formIsValid = false;
    //     errors["selectDate"] = "*Please date in dd-mm-yyyy format";
    //   }
    // }

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
    fetch("https://localhost:5001/sale/getallsales")
      .then(response => response.json())
      .then(data => {
        this.setState({ sal: data });
      });
  };
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  //   /////////////////////////////111111111111111111111111111111111111
  // handleSubmit = event => {
  //   event.preventDefault();
  //   //alert(event.target.salName.value);
  //   axios({
  //     method: "PUT",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     params: {
  //       id: event.target.salId.value,
  //       productId: event.target.selectProduct.value,
  //       customerId: event.target.selectCustomer.value,
  //       storeId: event.target.selectStore.value,
  //       dateSold: event.target.selectDate.value
  //     },
  //     url: "https://localhost:5001/sale/EditSales"
  //     // url: "https://localhost:5001/store/EditStores"
  //   })
  //     .then(res => res.json())
  //     .then(
  //       result => {
  //         // alert("result");
  //       },
  //       error => {
  //         //alert("Failed");
  //       }
  //     );
  // };
  //   /////////////////////////////00000000000000000000000000000000000

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
        url: "https://localhost:5001/sale/EditSales",
        // url: "https://localhost:5001/store/EditStores",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        params: {
          id: event.target.salId.value,
          // productId: event.target.selectProduct.key,
          //productId: event.target.selectProduct.value,
          productId: this.state.productId,
          // customerId: event.target.selectCustomer.value,
          customerId: this.state.customerId,
          // storeId: event.target.selectStore.key,
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
          alert("Fail to update Sale Madhu");
        });
      this.setState({ open: false });
    }
  };

  CaptureCustomerId = cId => {
    this.setState({ customerId: cId });
    alert(cId);
  };
  CaptureProductId = cId => {
    this.setState({ productId: cId });
    alert(cId);
  };
  CaptureStoreId = cId => {
    this.setState({ storeId: cId });
    alert(cId);
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
                    // placeholder="Id"
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
                  </select>
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
                  </select>
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
                  </select>
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
