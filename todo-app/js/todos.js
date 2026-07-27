import state from "./state.js";
import { saveTodos } from "./storage.js";

const addTodo = (text) => {
  const todo = {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: Date.now(),
  };

  state.todos.push(todo);
  saveTodos(state.todos);
  return todo;
};

const deleteTodo = (id) => {
  state.todos = state.todos.filter((todo) => todo.id !== id);
  saveTodos(state.todos);
};

const toggleTodo = (id, checked) => {
  const todo = state.todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = checked;
  }
  saveTodos(state.todos);
};

export { addTodo, deleteTodo, toggleTodo };
