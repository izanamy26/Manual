import React, { Component } from "react";
//import ReactDOM from "react-dom";
import { settingsPaginator } from "./../common/options";

import styles from "../styles/paginatorStyles.css";


class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: settingsPaginator.startActivePage
    };

    this.handlerClick = this.handlePageChange.bind(this);
  }

  handlePageChange(e) {
    console.log(11111);
    console.log(e.target);
    //this.setState({activePage: pageNumber});
  }

  render() {
    let pageCount = Math.ceil(settingsPaginator.totalItems/settingsPaginator.itemsPerPage);

    return (
      <div className={styles.paginator}>

        <div onClick={this.handlerClick} className={styles.navigate}>
          <a className='first-page'>&lt;&lt;</a>
          <a className='prev-page'>&lt;</a>
                {Array.from({ length: pageCount }, 
                    (e, k) => <a  key={k} number={k + 1} className="page">{k + 1}</a>)}
          <a className='next-page'>&gt;</a>
          <a className='last-page'>&gt;&gt;</a>
        </div>
      </div>
    );
  }
}

export default Paginator;
