import React, { useReducer, useState, useEffect } from "react";
import Form from "./Form";
import Filter from "./Filter";
import TodoList from "./TodoList";
import AppContext from "../context/AppContext";
import todosReducer from "../context/todosReducer";
import { ALL } from "../useFilter";

const Home = ({ match }) => {
  const localTodo = JSON.parse(localStorage.getItem("todos"));
  const [todos, todosDispatch] = useReducer(todosReducer, localTodo || []);

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
        <Filter setActiveFilter={setActiveFilter} />
        <TodoList filter={activeFilter} />
      </div>
    </AppContext.Provider>
  );
};
export default Home;
