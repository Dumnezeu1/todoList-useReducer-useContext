import React, { useContext, useState } from "react";
import AppContext from "../AppContext";
import { TOGGLE_TODO, DELETE_TODO } from "../todosReducer";
import { filterTodos } from "../useFilter";
import { HIGH, MEDIUM, LOW } from "../useFilter";

import UpdateTodo from "./UpdateTodo";

function TodoListItem({
  todo,
  onChangeTodo,
  onDeleteTodo,
  setIdUpdate,
  setUpdateDescription,
  setUpdateText,
}) {
  return (
    <li>
      <div className="todo-container">
        <label className="container">
          <div>
            <input
              checked={todo.done}
              onChange={onChangeTodo}
              type="checkbox"
            />
            <span className="checkmark"></span>
          </div>
          <div style={{ marginLeft: 20 }}>
            <h2 className={todo.done ? "done" : ""}> {todo.text}</h2>
            <p className={todo.done ? "done" : ""}> {todo.description}</p>
          </div>
        </label>
        <div className="buttons-container">
          <button className="priority-button">{todo.priority}</button>

          <button
            onClick={() => {
              setIdUpdate(todo.idTodo);
              setUpdateText(todo.text);
              setUpdateDescription(todo.description);
            }}
            className="update-button"
          >
            Update
          </button>
          <button onClick={onDeleteTodo} className="delete-button">
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

function SearchTodo({ setSearch }) {
  const formStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  };
  const searchInputStyle = {
    width: "100%",
    textAlign: "center",
  };
  const inputPlaceholder = "SearchToDo";

  return (
    <form style={formStyle}>
      <input
        style={searchInputStyle}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={inputPlaceholder}
      />
    </form>
  );
}

function TodoList({ filter }) {
  const { todos, todosDispatch } = useContext(AppContext);
  const todosToDisplay = filterTodos(todos, filter);
  const [search, setSearch] = useState("");

  const [idUpdate, setIdUpdate] = useState(0);
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateText, setUpdateText] = useState("");

  const notFoundStyle = {
    paddingTop: "30px",
    textAlign: "center",
  };

  const simpleSort = Array.from(todosToDisplay).sort((a, b) => {
    const one = a.priority;
    const two = b.priority;
    if (
      (one === HIGH && two === MEDIUM) ||
      (one === HIGH && two === LOW) ||
      (one === MEDIUM && two === LOW)
    ) {
      return -1;
    }
    if (
      (one === MEDIUM && two === HIGH) ||
      (one === LOW && two === MEDIUM) ||
      (one === LOW && two === HIGH)
    ) {
      return 1;
    }

    return 0;
  });

  let filterTodo = simpleSort.filter((todo) => {
    return todo.text.toLowerCase().indexOf(search.toLocaleLowerCase()) !== -1;
  });

  return (
    <>
      <SearchTodo setSearch={setSearch} />
      <UpdateTodo
        updateText={updateText}
        setUpdateText={setUpdateText}
        updateDescription={updateDescription}
        setUpdateDescription={setUpdateDescription}
        idUpdate={idUpdate}
        setIdUpdate={setIdUpdate}
      />
      {filterTodo.length !== 0 ? (
        <ul className="todo-list">
          {filterTodo.map((todo) => (
            <TodoListItem
              key={todo.idTodo}
              onChangeTodo={() =>
                todosDispatch({ type: TOGGLE_TODO, todoIndex: todo.idTodo })
              }
              onDeleteTodo={() =>
                todosDispatch({ type: DELETE_TODO, todoIndex: todo.idTodo })
              }
              todo={todo}
              updateDescription={updateDescription}
              setUpdateDescription={setUpdateDescription}
              setIdUpdate={setIdUpdate}
              setUpdateText={setUpdateText}
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
