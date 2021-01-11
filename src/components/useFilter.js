export const ALL = "all";
export const DONE = "done";
export const TODO = "todo";
export const HIGH = "HIGH";
export const MEDIUM = "MEDIUM";
export const LOW = "LOW";

export function filterTodos(todos, filter) {
  switch (filter) {
    case DONE:
      return todos.filter(t => t.done === true);
    case TODO:
      return todos.filter(t => t.done === false);
    case ALL:
    default:
      return todos;
  }
}
