import React from 'react';
import s from "./App.css";

import TodoItem from './components/Check';
import Footer from './components/Footer';

import todoData from './components/todoData';

function App() {

    const todoComponent = todoData.map(item =>
      <TodoItem key={item.id} todo={item} />); 

    return (
 
      <div className='app-body'>
        <div className='todo-app'>
          {todoComponent}
        </div>
      </div>
  

    );
}


export default App;
