import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Customer from "./components/customer/Customer";
import MenuTop from "./components/MenuTop";
import { Segment } from "semantic-ui-react";
import Store from "./components/store/Store";
import Product from "./components/product/Product";
import Sale from "./components/sale/Sale";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Segment>
          <h1 color="pink">Customer Product Store Management Portal</h1>
          <div>
            <MenuTop />
          </div>
          <Switch>
            <Route path="/" component={Customer} exact />
            <Route path="/customers" component={Customer} />
            <Route path="/products" component={Product} />
            <Route path="/sales" component={Sale} />
            <Route path="/stores" component={Store} exact />
          </Switch>
          <h5>&copy;{new Date().getFullYear()}Madhu</h5>
        </Segment>
      </BrowserRouter>
    );
  }
}
