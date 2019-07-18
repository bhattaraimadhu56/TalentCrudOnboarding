import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import MenuTop from "../MenuTop";
import { Table, Segment, Message } from "semantic-ui-react";
import { AddCustomerModal } from "./AddCustomerModal";
import { EditCustomerModal } from "./EditCustomerModal";
import { Paginate } from "../utilities/Paginate";

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cus: [],
      addModalShow: false,
      editModalShow: false,
      itemPerPage: 3,
      pageNumbers: [],
      currentPage: 1
    };
  }
  componentDidMount() {
    this.CustomerList();
  }
  componentDidUpdate() {
    this.CustomerList();
  }
  CustomerList = () => {
    fetch("https://localhost:5001/customer/getallcustomers")
      .then(response => response.json())
      .then(data => {
        this.setState({ cus: data, addModalShow: false });
      });
  };

  deleteCustomer = cusId => {
    if (window.confirm("Are you sure you want to delete")) {
      fetch("https://localhost:5001/customer/DeleteCustomers/" + cusId, {
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
    alert(i);
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
            <MenuTop />
          </Segment>
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
                <option value="5" onClick={this.onClickSelect}>
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
