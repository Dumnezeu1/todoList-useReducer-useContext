export const SET_TODOS = "set_todos";
export const ADD_TODO = "add_todo";
export const TOGGLE_TODO = "toggle_todo";
export const DELETE_TODO = "delete_todo";
export const UPDATE_TODO = "update_todo";

export default function todosReducer(state, action) {
  console.log(state);

  const todoIndex = [...state].findIndex(
    todo => todo.idTodo === action.todoIndex
  );

  const updateText = action.editText;
  const updateDescription = action.editDescription;

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
    case UPDATE_TODO:
      return [
        ...state.slice(0, todoIndex),
        {
          ...state[todoIndex],
          text: updateText,
          description: updateDescription
        },
        ...state.slice(todoIndex + 1, state.length)
      ];
    default:
      return state;
  }
}
