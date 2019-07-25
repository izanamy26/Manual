import React, { Component } from "react";
import ReactDOM from "react-dom";
import MoreDetails from "./Button";

class Row extends Component {
    constructor(props) {
        super();

        this.state = {
            datailsVisible: false,
            moreColumns: []    
        }

        this.clickMoreDetailsHandle = this.clickMoreDetailsHandle.bind(this);
    }
   
    clickMoreDetailsHandle(e) {
        this.setState((state, props) => ({
            datailsVisible: Boolean(state.datailsVisible ^ 1)
          }));
    }

    render() {     
        return (
            <tr>
                {Object.keys(this.props.dataRow).map((item, index) =>
                    <td key={index} className={item}>
                            <p>{this.props.dataRow[item].value}</p>
                            {(item === 'date') &&  <MoreDetails handleClick={this.clickMoreDetailsHandle} />}
                        </td>
                    )}
            </tr>
        );  
    }
}

 export default Row;