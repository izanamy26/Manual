import React, { Component } from "react";
import ReactDOM from "react-dom";
import Row from "./Row";
import DataManager from "./../common/tableData";
import { settingsTable } from "./../common/options";

class Table extends Component {
    constructor() {
        super();
console.log(settingsTable);

        this.tableData = DataManager.getTableData(settingsTable.length);
       
        console.log('tabel data: ', this.tableData);
    }

    render() {
        return (
            <table>
                <tbody>
                    <Row />
                </tbody>
            </table>    
        );  
    }

}

 export default Table;