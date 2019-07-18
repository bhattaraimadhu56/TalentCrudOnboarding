import React, { Component } from "react";
import Pagination from "semantic-ui-react-button-pagination";
class PaginationItem extends Component {
  constructor(props) {
    super(props);
    this.state = { offset: 0 };
  }
  handleClick(offset) {
    this.setState({ offset });
  }
  render() {
    return (
      <div align="right">
        <Pagination
          offset={this.state.offset}
          //limit={5}
          limit={this.props.limitPerPage}
          // eg total={20}
          total={this.props.totalPages}
          onClick={(e, props, offset) => this.handleClick(offset)}
          color="purple "
          currentPageColor="green"
        />
      </div>
    );
  }
}

export default PaginationItem;
