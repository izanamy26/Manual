import React from 'react';
import s from "./App.css";

import TodoItem from './components/Check';
import Footer from './components/Footer';

function App() {
    return (
 
      <div className='app-body'>
      
          <TodoItem itemId="item-1" />
          <TodoItem itemId="item-2" />
          <TodoItem itemId="item-3" />
          <TodoItem itemId="item-4" />

      </div>
  

    );
}


export default App;
