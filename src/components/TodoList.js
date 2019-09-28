import React, { useContext, useState } from "react";
import AppContext from "../AppContext";
import { TOGGLE_TODO, DELETE_TODO } from "../todosReducer";
import { filterTodos } from "../useFilter";

function TodoListItem({ todo, onChangeTodo, onDeleteTodo }) {
  return (
    <li>
      <div className="todo-container">
        <label className="container">
          <h2 className={todo.done ? "done" : ""}> {todo.text}</h2>
          <input checked={todo.done} onChange={onChangeTodo} type="checkbox" />
          <span className="checkmark"></span>
        </label>
        <div>
          <button className="priority-button">{todo.priority}</button>
          <button onClick={onDeleteTodo} className="delete-button">
            Delete
          </button>
        </div>
      </div>
      <p className={todo.done ? "done" : ""}> {todo.description}</p>
    </li>
  );
}

function SearchTodo({ setSearch }) {
  const formStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  };
  const searchInputStyle = {
    width: "100%",
    textAlign: "center"
  };
  const inputPlaceholder = "SearchToDo";

  return (
    <form style={formStyle}>
      <input
        style={searchInputStyle}
        onChange={e => setSearch(e.target.value)}
        placeholder={inputPlaceholder}
      />
    </form>
  );
}

function TodoList({ filter }) {
  const { todos, todosDispatch } = useContext(AppContext);
  const todosToDisplay = filterTodos(todos, filter);
  const [search, setSearch] = useState("");

  const notFoundStyle = {
    paddingTop: "30px",
    textAlign: "center"
  };

  let filterTodo = todosToDisplay.filter(todo => {
    return todo.text.toLowerCase().indexOf(search) !== -1;
  });
  console.table(filterTodo);

  return (
    <>
      <SearchTodo setSearch={setSearch} />
      {filterTodo.length !== 0 ? (
        <ul className="todo-list">
          {filterTodo.map(todo => (
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
      ) : (
        <div style={notFoundStyle}>Nothing to display</div>
      )}
    </>
  );
}

export default TodoList;
