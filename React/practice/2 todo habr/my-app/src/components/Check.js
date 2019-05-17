import React from 'react';



function TodoItem(props) {
    return (
       <div className="todo-item">
        <input id={props.todo.id} type="checkbox" name="check" checked={props.todo.completed} value={props.todo.id}
         onChange={() => props.handleChange(props.todo.id)} />
        <label for={props.todo.id}>{props.todo.text}</label>
      </div>
    );
}


export default TodoItem;
