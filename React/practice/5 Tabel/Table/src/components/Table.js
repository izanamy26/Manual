import React, { Component } from "react";
import Row from "./Row";
import { structureTable } from "./../common/options";


class Table extends Component {
    constructor(props) {
        super(props);
    }

    clickHeadCellHandle(item) {
        this.props.sort(item);
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