import React from 'react';
import AppStyle from "./App.css";

import TodoItem from './components/Check';
import todoData from './components/todoData';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      todos: todoData 
    };
  }

  render() {
    const todoComponent = this.state.todos.map(item =>
      <TodoItem key={item.id} todo={item} />); 

    return (
 
      <div className='app-body'>
        <div className='todo-app'>
          {todoComponent}
        </div>
      </div>
    );
  }
}


export default App;
