import React, { Component } from "react";
import ReactDOM from "react-dom";
import Table from "./Table";
import DateSelect from "./DateSelect";
import Paginator from "./Paginator";



class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <DateSelect />
                <Table />
                <Paginator />
            </div>
        );  
    }

}

 export default App;