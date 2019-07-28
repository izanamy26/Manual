import React, { Component } from "react";
import ReactDOM from "react-dom";
import Table from "./Table";
import DateSelect from "./DateSelect";
import Paginator from "./Paginator";
import { settingsTable } from "./../common/options";
import DataManager from "../common/TableData";


class App extends Component {
    constructor() {
        super();

        this.data =  DataManager.getTableData(settingsTable.length);    

        this.state = {
            data: this.data
        };

        this.changeShowedData = this.changeShowedData.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    changeShowedData() {}

    changePage (dataPerPage) {
        this.setState({
            data: dataPerPage
        });
    }

    render() {
        return (
            <div>
                <DateSelect />
                <Table data={this.state.data} />
                <Paginator data={this.data} onChangePage={this.changePage}/>
            </div>
        );  
    }

}

 export default App;