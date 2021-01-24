import React, { useContext, useState } from "react";
import AppContext from "../AppContext";
import { UPDATE_TODO } from "../todosReducer";
import { HIGH, MEDIUM, LOW } from "../useFilter";

function TodoList({
  updateText,
  setUpdateText,
  updateDescription,
  setUpdateDescription,
  idUpdate,
  setIdUpdate,
}) {
  const { todosDispatch } = useContext(AppContext);

  const [taskPriorityUpdate, setTaskPriorityUpdate] = useState(HIGH);

  return (
    <>
      {idUpdate !== 0 && (
        <form className="update-container">
          <br />
          <label>Update Task: {updateText} </label>
          <br />
          <input
            onChange={(e) => setUpdateText(e.target.value)}
            value={updateText}
          />
          <br />
          <input
            onChange={(e) => setUpdateDescription(e.target.value)}
            value={updateDescription}
          />
          <br />
          <br />
          <label>Task Priority:</label>
          <select onChange={(e) => setTaskPriorityUpdate(e.target.value)}>
            <option value={HIGH}>{HIGH}</option>
            <option value={MEDIUM}>{MEDIUM}</option>
            <option value={LOW}>{LOW}</option>
          </select>
          <br />
          <div>
            <button
              style={{ marginRight: 10 }}
              onClick={(e) => {
                e.preventDefault();
                todosDispatch({
                  type: UPDATE_TODO,
                  todoIndex: idUpdate,
                  editText: updateText,
                  editDescription: updateDescription,
                  editPrioritiy: taskPriorityUpdate,
                });
                setIdUpdate(0);
              }}
            >
              Update
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIdUpdate(0);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default TodoList;
