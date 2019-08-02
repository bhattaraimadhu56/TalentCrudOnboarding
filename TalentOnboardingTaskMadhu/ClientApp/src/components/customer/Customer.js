import React, { Component } from "react";
import { Table, Segment, Button, Confirm } from "semantic-ui-react";
import { AddCustomerModal } from "./AddCustomerModal";
import { EditCustomerModal } from "./EditCustomerModal";
import { Paginate } from "../utilities/Paginate";
// import {API} from "../config";

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cus: [],
      addModalShow: false,
      editModalShow: false,
      itemPerPage: 5,
      pageNumbers: [],
      currentPage: 1
      // open: false
    };
  } // end of constructor
  // show = () => this.setState({ open: true });
  // handleConfirm = cusId => {
  //   fetch("https://localhost:5001/customer/DeleteCustomers/" + cusId, {
  //     method: "DELETE",
  //     header: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(result => result.json())
  //     .then(data => {
  //       this.setState({ cus: data, open: false });
  //     });
  // };
  // handleCancel = () => this.setState({ open: false });
  componentDidMount() {
    this.CustomerList();
  }
  componentDidUpdate() {
    this.CustomerList();
  }
  // show = () => this.setState({ open: true });
  CustomerList = () => {
   // fetch(`${API}/customer/getallcustomers`)
   fetch(" https://madhutalent.azurewebsites.net/customer/getallcustomers")
   // fetch("https://localhost:5001/customer/getallcustomers")
    // fetch("https://talenton.azurewebsites.net/customer/getallcustomers")
      .then(response => response.json())
      .then(data => {
        //way1 Sorting data by customerName as come in "https://localhost:5001/customer/getallcustomers"
        //data.sort((a, b) => a.customerName.localeCompare(b.customerName));

        //way 2 Sorting
        //sorting by 1,2,3,4,5,
        //data.sort((a, b) => a.id - b.id);
        // Sorting Showing Latest id to First ....5,4,3,2,1
        data.sort((a, b) => b.id - a.id);
        this.setState({ cus: data, addModalShow: false });
      });
  };

  deleteCustomer = cusId => {
    if (window.confirm("Are you sure you want to delete?")) {
      // fetch(`${API}/customer/DeleteCustomers/` + cusId, {
        // fetch("https://madhutalent.azurewebsites.net/customer/DeleteCustomers/" + cusId, {
     // fetch("https://localhost:5001/customer/DeleteCustomers/" + cusId, {
      fetch("https://madhutalent.azurewebsites.net/customer/DeleteCustomers/"+cusId,{
        method: "DELETE",
               header: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
    }
  };

  onClickSelect = e => {
    let i = e.target.value;
    // alert(i);
    this.setState({ itemPerPage: i });
  };
  render() {
    const { cus, itemPerPage, currentPage } = this.state; // so that in future no need to write this.state.currentPage we simply can write currentPage
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });

    // Get current items
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const listToShow = cus.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => {
      this.setState({ currentPage: pageNumber });
    };

    return (
      <div>
        <Segment.Group>
          <Segment>
            <AddCustomerModal
              show={this.state.addModalShow}
              hide={addModalClose}
            />
            <div align="left">
              <label>Select number of row to display</label>
          
              <select nam="selectRowPerPage">
                <option value="3" onClick={this.onClickSelect}>
                  3
                </option>
                <option value="5" onClick={this.onClickSelect} selected>
                  5
                </option>
                <option value="10" onClick={this.onClickSelect}>
                  10
                </option>
                <option value={cus.length} onClick={this.onClickSelect}>
                  All
                </option>
              </select>
            </div>
            <Table selectable striped celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Address</Table.HeaderCell>
                  <Table.HeaderCell colSpan="2" textAlign="center">
                    Action
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {/* {cus.map(c => ( */}
                {listToShow.map(c => (
                  <Table.Row key={c.id}>
                    <Table.Cell>{c.customerName}</Table.Cell>
                    <Table.Cell>{c.customerAddress}</Table.Cell>
                    <Table.Cell>
                      <EditCustomerModal
                        show={this.state.editModalShow}
                        hide={editModalClose}
                        cusId={c.id} //cusId: c.id
                        cusName={c.customerName} //cusName: c.customerName,
                        cusAddress={c.customerAddress} //cusAddress: c.customerAddress
                      />
                    </Table.Cell>

                    <Table.Cell>
                      <Button
                        icon="delete"
                        color="red"
                        content="Delete"
                        onClick={() => this.deleteCustomer(c.id)}
                      />
                      {/* <Confirm
                        open={this.state.open}
                        onCancel={this.handleCancel}
                        //onConfirm={this.handleConfirm}
                        onConfirm={() => this.deleteCustomerk(c.id)}
                      >
                        kkk
                      </Confirm> */}
                      {/* <div>
                        <Button onClick={this.show}>{c.id}</Button>
                        <Confirm
                          open={this.state.open}
                          header="You are going to Delete this Customer"
                          onCancel={this.handleCancel}
                          onConfirm={() => this.handleConfirm(c.id)}
                        />
                      </div> */}
                    </Table.Cell>
                  </Table.Row>

                  /////////////
                ))}
              </Table.Body>
            </Table>

            <div align="right">
              <Paginate
                itemPerPage={itemPerPage}
                totalItem={cus.length}
                paginate={paginate}
              />
            </div>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}
