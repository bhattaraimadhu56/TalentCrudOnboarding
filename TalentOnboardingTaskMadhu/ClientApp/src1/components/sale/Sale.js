import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import MenuTop from "../MenuTop";
import { Table, Segment } from "semantic-ui-react";
import { AddSaleModal } from "./AddSaleModal";
import { EditSaleModal } from "./EditSaleModal";

//import Pagination from "./Pagination";

export default class Sale extends Component {
  constructor(props) {
    super(props);
    this.state = { sal: [], addModalShow: false, editModalShow: false };
  }
  componentDidMount() {
    this.SaleList();
  }
  componentDidUpdate() {
    this.SaleList();
  }

  SaleList = () => {
    fetch("https://localhost:5001/sale/getallsales")
      .then(response => response.json())
      .then(data => {
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
      // axios({
      //   method: "DELETE",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json"
      //   },
      //   // params: {
      //   //   id: salId,
      //   // },
      //   url: "https://localhost:5001/sale/DeleteSales/" + salId
      // });
    }
  };

  handlePageChange = page => {
    console.log(page);
  };
  render() {
    const { sal } = this.state; // used in EditSaleModal as parameter
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });

    return (
      <div>
        <Segment.Group>
          <Segment>
            <MenuTop />
          </Segment>
          <Segment>
            <AddSaleModal show={this.state.addModalShow} hide={addModalClose} />
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
                {sal.map(c => (
                  <Table.Row key={c.id}>
                    <Table.Cell>{c.customerName}</Table.Cell>
                    <Table.Cell>{c.productName}</Table.Cell>
                    <Table.Cell>{c.storeName}</Table.Cell>
                    <Table.Cell>{c.price}</Table.Cell>
                    <Table.Cell>{c.dateSold.toString()}</Table.Cell>

                    <Table.Cell>
                      <EditSaleModal
                        show={this.state.editModalShow}
                        hide={editModalClose}
                        salId={c.id} //salId: c.id
                        customerName={c.customerName}
                        productName={c.address}
                        storeName={c.storeName}
                        price={c.price}
                        dateSold={c.dateSold}
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
            <div>
              {/* <Pagination
                itemsCount={sal.length}
                pageSize={3} // {this.state.pageSize}
                onPageChange={this.handlePageChange}
              /> */}
            </div>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}
