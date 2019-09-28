import React, { useContext, useRef, useState } from "react";
import AppContext from "../AppContext";
import { ADD_TODO } from "../todosReducer";

function Form() {
  const [todoText, setTodoText] = useState("");
  const [todoDetails, setTodoDetails] = useState("");
  const [taskPriority, setTaskPriority] = useState("");

  const { todosDispatch } = useContext(AppContext);
  const inputField = useRef(null);

  function clickHandler(e) {
    e.preventDefault();
    if (todoText.trim().length > 0 && todoDetails.trim().length > 0) {
      todosDispatch({
        type: ADD_TODO,
        todo: {
          idTodo: Date.now(),
          text: todoText,
          description: todoDetails,
          done: false,
          priority: taskPriority
        }
      });
      setTodoText("");
      setTodoDetails("");
      inputField.current.focus();
    }
  }

  return (
    <form className="form-container">
      <label>Task:</label>
      <input
        ref={inputField}
        value={todoText}
        onChange={e => setTodoText(e.target.value)}
        type="text"
      />
      <label>Description:</label>
      <textarea
        rows="4"
        ref={inputField}
        onChange={e => setTodoDetails(e.target.value)}
        value={todoDetails}
      />
      <label>Task Priority:</label>
      <select onChange={e => setTaskPriority(e.target.value)}>
        <option value="HIGH">HIGH</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="LOW">LOW</option>
      </select>

      <button onClick={clickHandler} type="submit">
        Add
      </button>
    </form>
  );
}

export default Form;
