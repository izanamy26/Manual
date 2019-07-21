import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";


class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 2
    };
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  render() {
    return (
      <div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={5}
          totalItemsCount={10}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Paginator;