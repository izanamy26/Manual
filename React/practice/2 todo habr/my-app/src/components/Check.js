import React from 'react';


function TodoItem(props) {
    return (
       <div className="todo-item">
        <input id={props.itemId} type="checkbox" name="check" value="check1" />
        <label for={props.itemId}>Checkbox No. 1</label>
      </div>
    );
}


export default TodoItem;
