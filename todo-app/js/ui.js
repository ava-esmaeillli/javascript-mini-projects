const createTodoElement = (todo, todoList, actions) => {
  const li = document.createElement("li");
  const liText = document.createElement("span");
  const deleteBtn = document.createElement("button");
  const checkbox = document.createElement("input");

  liText.innerText = todo.text;
  deleteBtn.innerText = "Delete";

  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  li.append(checkbox, liText, deleteBtn);
  todoList.append(li);

  checkbox.addEventListener("change", () => {
    actions.toggleTodo(todo.id, checkbox.checked);
  });

  deleteBtn.addEventListener("click", () => {
    actions.deleteTodo(todo.id);
  });
};

export { createTodoElement };
