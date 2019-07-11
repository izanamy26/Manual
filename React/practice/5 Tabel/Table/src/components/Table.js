import React, { Component } from "react";
import ReactDOM from "react-dom";
import Row from "./Row";
import DataManager from "../common/TableData";
import Sorter from "../common/Sorter";
import { settingsTable, structureTable } from "./../common/options";

const ORDER_DESC = 'desc';
const ORDER_ASC = 'asc';

class Table extends Component {
    constructor() {
        super();

        this.state = {
            sortOrder: ORDER_DESC
        };

        this.tableData = DataManager.getTableData(settingsTable.length);

        console.log('tabel data: ', this.tableData);
    }

    clickHeadCellHandle(item) {
        this.setState((state, props) => ({
            sortOrder: state.sortOrder == ORDER_DESC ? ORDER_ASC : ORDER_DESC
          }));

        let data = Sorter.getSortedData( this.tableData,
                                         item, 
                                         structureTable[item].type, 
                                         this.state.sortOrder );

        console.log(data);
    }


    render() {
        return (
            <table>
                <thead>
                    <tr>
                        { Object.keys(structureTable).map(item => 
                            <td className={item} key={item} onClick={this.clickHeadCellHandle.bind(this, item)}>
                                {structureTable[item].title}
                                </td>
                            )}
                    </tr>
                </thead>   
                <tbody>
                    {this.tableData.map((item, index) => 
                        <Row key={index + 1} dataRow={item} index={index} />
                        )}
                </tbody>
            </table>    
        );  
    }

}

 export default Table;