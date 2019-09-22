export const SET_TODOS = "set_todos";
export const ADD_TODO = "add_todo";
export const TOGGLE_TODO = "toggle_todo";
export const DELETE_TODO = "delete_todo";

export default function todosReducer(state, action) {
  const todoIndex = [...state].findIndex(
    todo => todo.idTodo === action.todoIndex
  );

  switch (action.type) {
    case TOGGLE_TODO:
      return [
        ...state.slice(0, todoIndex),
        { ...state[todoIndex], done: !state[todoIndex].done },
        ...state.slice(todoIndex + 1, state.length)
      ];
    case ADD_TODO:
      return [...state, action.todo];
    case DELETE_TODO:
      return state.filter((_, idx) => idx !== todoIndex);
    default:
      return state;
  }
}
