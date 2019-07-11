import React, { Component } from "react";
import ReactDOM from "react-dom";


class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {     
        return (
           <span className="more-details" onClick={this.props.handleClick}>More details</span>
        );  
    }
}

 export default Button;