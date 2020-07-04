import React, { Component } from "react";
import { Pagination } from "semantic-ui-react";
class Paginator extends Component {
  state = {};
  handlePageChange = (e, d) => {
    this.props.onPagechange(d.activePage);
  };
  render() {
    return (
      <Pagination
        className="mypaginator"
        boundaryRange={0}
        defaultActivePage={this.props.currentPage}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        nextItem={
          this.props.currentPage == this.props.totalpages ? null : undefined
        }
        prevItem={this.props.currentPage == 1 ? null : undefined}
        siblingRange={2}
        totalPages={this.props.totalpages}
        onPageChange={this.handlePageChange}
      />
    );
  }
}

export default Paginator;
