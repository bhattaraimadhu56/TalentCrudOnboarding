import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Table, Segment } from "semantic-ui-react";
import { AddProductModal } from "./AddProductModal";
import { EditProductModal } from "./EditProductModal";
import { Paginate } from "../utilities/Paginate";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prod: [],
      addModalShow: false,
      editModalShow: false,
      itemPerPage: 5,
      pageNumbers: [],
      currentPage: 1
    };
  }
  componentDidMount() {
    this.ProductList();
  }
  componentDidUpdate() {
    this.ProductList();
  }

  ProductList = () => {
    fetch("https://localhost:5001/product/getallproducts")
      .then(response => response.json())
      .then(data => {
        this.setState({ prod: data, addModalShow: false });
      });
  };

  deleteProduct = prodId => {
    if (window.confirm("Are you sure you want to delete")) {
      fetch("https://localhost:5001/product/DeleteProducts/" + prodId, {
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
      //   //   id: prodId,
      //   // },
      //   url: "https://localhost:5001/product/DeleteProducts/" + prodId
      // });
    }
  };

  onClickSelect = e => {
    let i = e.target.value;
    // alert(i);
    this.setState({ itemPerPage: i });
  };
  render() {
    const { prod, itemPerPage, currentPage } = this.state; // used in EditProductModal as parameter
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    // Get current items
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const listToShow = prod.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => {
      this.setState({ currentPage: pageNumber });
    };
    return (
      <div>
        <Segment.Group>
          {/* <Segment>
            <MenuTop />
          </Segment> */}
          {/* <Button
          primary
          icon="add"
          onClick={() => this.setState({ addModalShow: true })}
        /> */}
          {/* <Button
          color="green"
          icon="plus"
          content="Add Product"
          onClick={() => this.setState({ addModalShow: true })}
        /> */}
          {/* <Button primary onClick={() => this.setState({ addModalShow: true })}>
          Add Department
        </Button> */}
          <Segment>
            <AddProductModal
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
                <option value={prod.length} onClick={this.onClickSelect}>
                  All
                </option>
              </select>
            </div>

            <Table selectable striped celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell colSpan="2" textAlign="center">
                    Action
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {listToShow.map(c => (
                  <Table.Row key={c.id}>
                    <Table.Cell>{c.productName}</Table.Cell>
                    <Table.Cell>{c.price}</Table.Cell>
                    <Table.Cell>
                      <EditProductModal
                        show={this.state.editModalShow}
                        hide={editModalClose}
                        prodId={c.id} //prodId: c.id
                        prodName={c.productName} //prodName: c.productName,
                        prodPrice={c.price} //prodPrice: c.price
                      />
                    </Table.Cell>

                    <Table.Cell>
                      <Button
                        icon="delete"
                        color="red"
                        content="Delete"
                        onClick={() => this.deleteProduct(c.id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <div align="right">
              <Paginate
                itemPerPage={itemPerPage}
                totalItem={prod.length}
                paginate={paginate}
              />
            </div>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}
