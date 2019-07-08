import React, { Component } from "react";
import ReactDOM from "react-dom";

class Row extends Component {
    constructor(props) {
        super();
    }

    render() {     
        return (
            <tr>
                {Object.keys(this.props.dataRow).map((item, index) =>
                    <td key={index} className={item}>
                            {this.props.dataRow[item].value}
                        </td>
                    )}
            </tr>
        );  
    }
}

 export default Row;