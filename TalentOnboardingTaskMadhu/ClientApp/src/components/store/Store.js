import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Table, Segment } from "semantic-ui-react";
import { AddStoreModal } from "./AddStoreModal";
import { EditStoreModal } from "./EditStoreModal";
import { Paginate } from "../utilities/Paginate";

export default class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: [],
      addModalShow: false,
      editModalShow: false,
      itemPerPage: 5,
      pageNumbers: [],
      currentPage: 1
    };
  }
  componentDidMount() {
    this.StoreList();
  }
  componentDidUpdate() {
    this.StoreList();
  }

  StoreList = () => {
    
   // fetch("https://localhost:5001/store/GetAllStores")
    fetch("https://madhutalent.azurewebsites.net/store/GetAllStores")
      .then(response => response.json())
      .then(data => {
        // Sorting Showing Latest id to First ....5,4,3,2,1
        data.sort((a, b) => b.id - a.id);
        this.setState({ store: data, addModalShow: false });
      });
  };

  deleteStore = storeId => {
    if (window.confirm("Are you sure you want to delete")) {
      // fetch("https://localhost:5001/store/DeleteStores/" + storeId, {
        fetch("https://madhutalent.azurewebsites.net/store/DeleteStores/" + storeId, {
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
      //   //   id: storeId,
      //   // },
      //   url: "https://localhost:5001/store/DeleteStores/" + storeId
      // });
    }
  };

  onClickSelect = e => {
    let i = e.target.value;
    // alert(i);
    this.setState({ itemPerPage: i });
  };
  render() {
    const { store, itemPerPage, currentPage } = this.state; // used in EditStoreModal as parameter
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    // Get current items
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const listToShow = store.slice(indexOfFirstItem, indexOfLastItem);

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
          content="Add Store"
          onClick={() => this.setState({ addModalShow: true })}
        /> */}
          {/* <Button primary onClick={() => this.setState({ addModalShow: true })}>
          Add Department
        </Button> */}
          <Segment>
            <AddStoreModal
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
                <option value={store.length} onClick={this.onClickSelect}>
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
                {listToShow.map(c => (
                  <Table.Row key={c.id}>
                    <Table.Cell>{c.storeName}</Table.Cell>
                    <Table.Cell>{c.storeAddress}</Table.Cell>
                    <Table.Cell>
                      <EditStoreModal
                        show={this.state.editModalShow}
                        hide={editModalClose}
                        storeId={c.id} //storeId: c.id
                        storeName={c.storeName} //storeName: c.storeName,
                        storeAddress={c.storeAddress} //storeAddress: c.storeAddress
                      />
                    </Table.Cell>

                    <Table.Cell>
                      <Button
                        icon="delete"
                        color="red"
                        content="Delete"
                        onClick={() => this.deleteStore(c.id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <div align="right">
              <Paginate
                itemPerPage={itemPerPage}
                totalItem={store.length}
                paginate={paginate}
              />
            </div>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}
