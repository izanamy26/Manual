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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(id) {
      this.setState(prevState => {
        const updatedTodos = prevState.todos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
          }
          return todo;
        });

        return {
          todos: updatedTodos
        };
      });
  }

  render() {
    const todoComponent = this.state.todos.map(item =>
      <TodoItem key={item.id} todo={item} handleChange={this.handleChange} />); 

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
