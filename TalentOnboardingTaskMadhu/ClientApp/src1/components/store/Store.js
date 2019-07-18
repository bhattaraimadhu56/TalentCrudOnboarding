import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import MenuTop from "../MenuTop";
import { Table, Segment } from "semantic-ui-react";
import { AddStoreModal } from "./AddStoreModal";
import { EditStoreModal } from "./EditStoreModal";
//import Pagination from "./Pagination";

export default class Store extends Component {
  constructor(props) {
    super(props);
    this.state = { store: [], addModalShow: false, editModalShow: false };
  }
  componentDidMount() {
    this.StoreList();
  }
  componentDidUpdate() {
    this.StoreList();
  }

  StoreList = () => {
    fetch("https://localhost:5001/store/GetAllStores")
      .then(response => response.json())
      .then(data => {
        this.setState({ store: data, addModalShow: false });
      });
  };

  deleteStore = storeId => {
    if (window.confirm("Are you sure you want to delete")) {
      fetch("https://localhost:5001/store/DeleteStores/" + storeId, {
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

  handlePageChange = page => {
    console.log(page);
  };
  render() {
    const { store } = this.state; // used in EditStoreModal as parameter
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });

    return (
      <div>
        <Segment.Group>
          <Segment>
            <MenuTop />
          </Segment>
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
                {store.map(c => (
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
            <div> 
              {/* <Pagination
                itemsCount={store.length}
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
