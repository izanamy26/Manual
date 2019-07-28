import React, { Component } from "react";
import { settingsPaginator } from "./../common/options";
import styles from "../styles/paginatorStyles.css";


class Paginator extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activePage: settingsPaginator.startActivePage
    };

    this.props.onChangePage(this.getDataPerPage(settingsPaginator.startActivePage));
    this.handlerClick = this.handlePageChange.bind(this);
  }


  handlePageChange(e) {
    if (e.target.nodeName !== 'A')
      return;
  
    let activePage = Number(e.target.getAttribute('number'));
    
    if (activePage) {
      this.setState({activePage: activePage});

    }

    this.props.onChangePage(this.getDataPerPage(activePage));
  }

  getDataPerPage(activePage) {
    let startIndex = (activePage - 1) * settingsPaginator.itemsPerPage;
    let endIndex = activePage * settingsPaginator.itemsPerPage;

    return this.props.data.slice(startIndex, endIndex);
  }

  render() {
    let pageCount = Math.ceil(settingsPaginator.totalItems/settingsPaginator.itemsPerPage);

    return (
      <div className={styles.paginator}>

        <div onClick={this.handlerClick} className={styles.navigate}>
          <a className='first-page' number={1}>&lt;&lt;</a>
          <a className='prev-page' number={(this.state.activePage > 1) ? this.state.activePage - 1 : 1}>&lt;</a>
                {Array.from({ length: pageCount }, 
  (e, k) => <a  key={k} number={k + 1} className={'page ' + (this.state.activePage == k + 1 ? styles.active : '')}>{k + 1}</a>)}
          <a className='next-page' number={(this.state.activePage < pageCount) ? this.state.activePage + 1 : pageCount}>&gt;</a>
          <a className='last-page' number={pageCount} >&gt;&gt;</a>
        </div>
      </div>
    );
  }
}

export default Paginator;
