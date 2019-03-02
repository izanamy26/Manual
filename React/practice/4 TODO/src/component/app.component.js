import React, { Component } from "react";
import s from "./app.component.css";
class MyComponent extends Component {
  render() {
    return <ul className={s.intro}>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
  }
}
export default MyComponent;