import React, { useContext } from "react";
import AppContext from "../AppContext";
import { TOGGLE_TODO, DELETE_TODO } from "../todosReducer";
import { filterTodos } from "../useFilter";

const buttonStyle = {
  marginLeft: "5px"
};

function TodoListItem({ todo, onChangeTodo, onDeleteTodo }) {
  return (
    <li>
      <label className={todo.done ? "done" : ""}>
        <input checked={todo.done} onChange={onChangeTodo} type="checkbox" />
        {todo.text}
      </label>
      <button style={buttonStyle} onClick={onDeleteTodo}>
        Del
      </button>
    </li>
  );
}
function TodoList({ filter }) {
  const { todos, todosDispatch } = useContext(AppContext);
  const todosToDisplay = filterTodos(todos, filter);

  return (
    <ul className="todo-list">
      {todosToDisplay.map(todo => (
        <TodoListItem
          key={todo.idTodo}
          onChangeTodo={() =>
            todosDispatch({ type: TOGGLE_TODO, todoIndex: todo.idTodo })
          }
          onDeleteTodo={() =>
            todosDispatch({ type: DELETE_TODO, todoIndex: todo.idTodo })
          }
          todo={todo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
