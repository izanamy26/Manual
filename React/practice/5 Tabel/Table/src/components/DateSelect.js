import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DatePicker } from '@y0c/react-datepicker';
import '@y0c/react-datepicker/assets/styles/calendar.scss';

class DateSelect extends Component {
    onChange(date) {
        console.log(date);
      }
      
      render() {
        return (
            <div>
                 <DatePicker  onChange={this.onChange} 
                    showDefaultIcon
                    dateFormat='DD.MM.YYYY' />

                <DatePicker  onChange={this.onChange} 
                    showDefaultIcon
                    dateFormat='DD.MM.YYYY' />
            </div>
         
        )
      }
}

 export default DateSelect;