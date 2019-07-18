import React, { Component } from "react";
import { Input, Menu } from "semantic-ui-react";
import Customer from "./customer/Customer";
import { Link } from "react-router-dom";

export default class MenuTop extends Component {
  state = { activeItem: "React" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing color="green">
          <Menu.Item
            name="Customer"
            active={activeItem === "Customer"}
            onClick={this.handleItemClick}
            as={Link}
            to="/customers"
          />
          <Menu.Item
            name="Product"
            active={activeItem === "Product"}
            onClick={this.handleItemClick}
            as={Link}
            to="/products"
          />
          <Menu.Item
            name="Store"
            active={activeItem === "Store"}
            onClick={this.handleItemClick}
            as={Link}
            to="/stores"
          />
          <Menu.Item
            name="Sale"
            active={activeItem === "Sale"}
            onClick={this.handleItemClick}
            as={Link}
            to="/sales"
          />
        </Menu>
      </div>
    );
  }
}
