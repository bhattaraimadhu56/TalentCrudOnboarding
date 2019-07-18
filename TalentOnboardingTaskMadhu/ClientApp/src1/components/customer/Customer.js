import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import MenuTop from "../MenuTop";
import { Table, Segment } from "semantic-ui-react";
import { AddCustomerModal } from "./AddCustomerModal";
import { EditCustomerModal } from "./EditCustomerModal";
import { paginate, Pagiante } from "../utilities/paginate";
import Pagination from "semantic-ui-react-button-pagination";
export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cus: [],
      addModalShow: false,
      editModalShow: false,
      offset: 0,
      itemPerPage: 3,
      pageNumbers: []
    };
  }
  componentDidMount() {
    this.CustomerList();
  }
  componentDidUpdate() {
    this.CustomerList();
  }
  handleClick(page) {
    this.setState({
      currentPage: page
    });
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
      // axios({
      //   method: "DELETE",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json"
      //   },
      //   // params: {
      //   //   id: cusId,
      //   // },
      //   url: "https://localhost:5001/customer/DeleteCustomers/" + cusId
      // });
    }
  };

  handlePageChange = page => {
    console.log(page);
  };
  onClickSelect = e => {
    let i = e.target.value;
    // alert(i);
    this.setState({ itemPerPage: i });
  };
  render() {
    const { cus, itemPerPage, pageNumbers } = this.state; // used in EditCustomerModal as parameter
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    const listToShow = Pagiante(this.state.cus, pageNumbers, itemPerPage);
    //const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(cus.length / itemPerPage); i++) {
      pageNumbers.push(i);
    }

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
              <Pagination
                offset={this.state.offset}
                limit={itemPerPage}
                total={cus.length}
                currentPage
                onClick={page => this.handleClick(page)}
                color="blue "
              />
            </div>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}
