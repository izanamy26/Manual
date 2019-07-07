import React, { Component } from "react";
import ReactDOM from "react-dom";
import Row from "./Row";
import DataManager from "./../common/tableData";
import { settingsTable, structureTable } from "./../common/options";

class Table extends Component {
    constructor() {
        super();

        this.tableData = DataManager.getTableData(settingsTable.length);
      
       
        console.log('tabel data: ', this.tableData);
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        { Object.keys(structureTable).map(item => 
                            <td className={item} key={item}>{structureTable[item].title}</td>
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