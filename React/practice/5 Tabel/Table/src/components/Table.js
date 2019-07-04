import React, { Component } from "react";
import ReactDOM from "react-dom";
import Row from "./Row";

class Table extends Component {
    constructor() {
        super();
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