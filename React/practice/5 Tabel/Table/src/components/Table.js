import React, { Component } from "react";
import ReactDOM from "react-dom";
import Row from "./Row";

import Sorter from "../common/Sorter";
import { structureTable } from "./../common/options";

const ORDER_DESC = 'desc';
const ORDER_ASC = 'asc';

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sortOrder: ORDER_DESC
        };

    }

    clickHeadCellHandle(item) {
        this.setState((state, props) => ({
            sortOrder: state.sortOrder == ORDER_DESC ? ORDER_ASC : ORDER_DESC
          }));

        let data = Sorter.getSortedData( this.props.data,
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
                    {this.props.data.map((item, index) => 
                        <Row key={index + 1} dataRow={item} index={index} />
                        )}
                </tbody>
            </table>    
        );  
    }

}

 export default Table;