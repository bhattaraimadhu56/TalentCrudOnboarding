import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Table, Segment } from "semantic-ui-react";
import { AddSaleModal } from "./AddSaleModal";
import { EditSaleModal } from "./EditSaleModal";
import { Paginate } from "../utilities/Paginate";

export default class Sale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sal: [],
      addModalShow: false,
      editModalShow: false,
      itemPerPage: 5,
      pageNumbers: [],
      currentPage: 1
    };
  }
  componentDidMount() {
    this.SaleList();
  }
  componentDidUpdate() {
    this.SaleList();
  }
  componentWillMount() {
    this.SaleList();
  }
  componentWillUpdate() {
    this.SaleList();
  }

  SaleList = () => {
    fetch("https://localhost:5001/sale/getallsales")
      .then(response => response.json())
      .then(data => {
        // Sorting Showing Latest id to First ....5,4,3,2,1
        data.sort((a, b) => b.id - a.id);
        this.setState({ sal: data, addModalShow: false });
      });
  };

  deleteSale = salId => {
    if (window.confirm("Are you sure you want to delete")) {
      fetch("https://localhost:5001/sale/DeleteSales/" + salId, {
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
    const { sal, itemPerPage, currentPage } = this.state; // used in EditSaleModal as parameter
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    // Get current items
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const listToShow = sal.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => {
      this.setState({ currentPage: pageNumber });
    };

    return (
      <div>
        <Segment.Group>
          <Segment>
            <AddSaleModal show={this.state.addModalShow} hide={addModalClose} />
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
                <option value={sal.length} onClick={this.onClickSelect}>
                  All
                </option>
              </select>
            </div>

            <Table selectable striped celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Customer Name</Table.HeaderCell>
                  <Table.HeaderCell>Product Name</Table.HeaderCell>
                  <Table.HeaderCell>Store Name</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Sold Date</Table.HeaderCell>
                  <Table.HeaderCell colSpan="2" textAlign="center">
                    Action
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {listToShow.map(c => (
                  <Table.Row key={c.id}>
                    <Table.Cell>{c.customerName}</Table.Cell>
                    <Table.Cell>{c.productName}</Table.Cell>
                    <Table.Cell>{c.storeName}</Table.Cell>
                    <Table.Cell>{c.price}</Table.Cell>
                    <Table.Cell>
                      {/* {new Date(c.dateSold).toDateString()} */}
                      {new Date(c.dateSold).toLocaleDateString("en-GB")}
                      {/* .split("/")
                        .reverse()
                        .join("-")} */}

                      {/* //others
                      {new Date(c.dateSold).toISOString().slice(0, 10)}
                      {new Date(c.dateSold).toLocaleDateString()}
                    */}
                    </Table.Cell>

                    <Table.Cell>
                      <EditSaleModal
                        show={this.state.editModalShow}
                        hide={editModalClose}
                        salId={c.id} //{salId} //{c.id}
                        customerName={c.customerName} //{customerName} //{c.customerName}
                        productName={c.productName} //{customerAddress} //{c.address}
                        storeName={c.storeName} //{storeName} //{c.storeName}
                        price={c.price} //{price} //{c.price}
                        dateSold={c.dateSold} //{dateSold} //{c.dateSold}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        icon="delete"
                        color="red"
                        content="Delete"
                        onClick={() => this.deleteSale(c.id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <div align="right">
              <Paginate
                itemPerPage={itemPerPage}
                totalItem={sal.length}
                paginate={paginate}
              />
            </div>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}
