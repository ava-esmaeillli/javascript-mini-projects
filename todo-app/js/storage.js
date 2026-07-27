const saveTodos = (items) => {
  const todosString = JSON.stringify(items);
  localStorage.setItem("todos", todosString);
};

const loadTodos = () => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
};

export { saveTodos, loadTodos };
