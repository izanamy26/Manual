import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DatePicker } from '@y0c/react-datepicker';
import '@y0c/react-datepicker/assets/styles/calendar.scss';

class DateSelect extends Component {
    constructor() {
      super();

      this.state={
        'from' : '',
        'to': ''
      }

      this.handlerChangeFromDate = this.onChange.bind(this, 'from');
      this.handlerChangeToDate = this.onChange.bind(this, 'to');
    }


    onChange(stateName, date, strDate) {
        this.setState({
          [stateName] : strDate
        });
      }
      
      render() {
        return (
            <div className='date-block'>
                 <DatePicker  onChange={this.handlerChangeFromDate} 
                    className='date-from'
                    showDefaultIcon
                    dateFormat='YYYY-MM-DD' />

                <DatePicker  onChange={this.handlerChangeToDate} 
                    className='date-to'
                    showDefaultIcon
                    dateFormat='YYYY-MM-DD' />
            </div>
         
        )
      }
}

 export default DateSelect;