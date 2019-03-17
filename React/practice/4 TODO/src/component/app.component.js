import React, { Component } from "react";
import s from "./app.component.css";


function List() {
  const name = 'Ivan';
  const firstname = 'Ivanov';
  const surname = 'Ivanovich';

  return (<ul className={s.intro}>
    <li>{ firstname }</li>
    <li>{ name }</li>
    <li>{ surname }</li>
  </ul>)
}


class MyComponent extends Component {

  render() {
    return (
        <List />
    )
  }
}
export default MyComponent;