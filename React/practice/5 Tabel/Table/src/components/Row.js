import React, { Component } from "react";
import ReactDOM from "react-dom";

class Row extends Component {
    constructor(props) {
        super();
        this.dataRow = props.dataRow;
        this.indexRow = props.index;
    }

    render() {     
        return (
            <tr key={"row-" + this.indexRow}>
                {Object.keys(this.dataRow).map((item, index) =>
                    <td key={'td-' + this.indexRow + '-' + index}
                        className={item}>
                            {this.dataRow[item].value}
                        </td>
                    )}
            </tr>
        );  
    }
}

 export default Row;