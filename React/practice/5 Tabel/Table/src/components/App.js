import React, { Component } from "react";
import ReactDOM from "react-dom";
import Table from "./Table";
import DateSelect from "./DateSelect";
import Paginator from "./Paginator";
import { settingsTable } from "./../common/options";
import Sorter from "../common/Sorter";
import DataManager from "../common/TableData";


class App extends Component {
    constructor() {
        super();

        this.data =  DataManager.getTableData(settingsTable.length);    

        this.state = {
           showData: this.data
        };

        this.sortData = this.sortData.bind(this);
        this.changePage = this.changePage.bind(this);
    }

   
    sortData(item) {
        console.log('item: ', item);
        /*this.setState((state, props) => ({
            sortOrder: state.sortOrder == ORDER_DESC ? ORDER_ASC : ORDER_DESC
          }));

        let data = Sorter.getSortedData( this.props.data,
                                         item, 
                                         structureTable[item].type, 
                                         this.state.sortOrder );

        console.log(data);*/
    }     


    changePage (dataPerPage) {
        this.setState({
            showData: dataPerPage
        });
    }

    render() {
        return (
            <div>
                <DateSelect />
                <Table data={this.state.showData} sort={this.sortData} />
                <Paginator data={this.data} onChangePage={this.changePage}/>
            </div>
        );  
    }

}

 export default App;