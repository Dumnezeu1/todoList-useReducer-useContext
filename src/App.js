import React, { useReducer, useState, useEffect } from "react";
import Form from "./components/Form";
import Filter from "./components/Filter";
import TodoList from "./components/TodoList";
import AppContext from "./AppContext";
import todosReducer from "./todosReducer";
import { ALL } from "./useFilter";

import "./styles/dist/App.css";

function App({ match }) {
  const [todos, todosDispatch] = useReducer(
    todosReducer,
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const [activeFilter, setActiveFilter] = useState(ALL);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const param = match.params.filter;
    if (param !== undefined) setActiveFilter(param.toLowerCase());
    else setActiveFilter(param);
  }, [match.params.filter]);

  return (
    <AppContext.Provider value={{ todos, todosDispatch, activeFilter }}>
      <div className="todo-app">
        <Form />
        <div style={{ marginTop: 100 }}>
          <Filter setActiveFilter={setActiveFilter} />
          <TodoList filter={activeFilter} />
        </div>
      </div>
    </AppContext.Provider>
  );
}
export default App;
