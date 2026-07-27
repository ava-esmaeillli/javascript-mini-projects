import { saveTodos, loadTodos } from "./storage.js";
import state from "./state.js";
import { createTodoElement } from "./ui.js";
import { addTodo, deleteTodo, toggleTodo } from "./todos.js";

document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.getElementById("todoInput");
  const addBtn = document.getElementById("addBtn");
  const todoList = document.getElementById("todoList");
  const itemsLeft = document.getElementById("itemsLeft");
  const clearCompletedBtn = document.getElementById("clearCompletedBtn");
  const activeBtn = document.getElementById("activeBtn");
  const allBtn = document.getElementById("allBtn");
  const completedBtn = document.getElementById("completedBtn");
  const filterBtns = document.querySelectorAll(".filters .filter button");
  const newestBtn = document.getElementById("newestBtn");
  const oldestBtn = document.getElementById("oldestBtn");
  const sortBtns = document.querySelectorAll(".filters .sort button");

  const updateItemsLeft = () => {
    const unfinishedCount = state.todos.filter(
      (todo) => !todo.completed,
    ).length;
    itemsLeft.innerText = `${unfinishedCount} items left`;
  };

  const getFilteredTodos = () => {
    if (state.currentFilter === "all") {
      state.activeFilter = allBtn;
      return [...state.todos];
    } else if (state.currentFilter === "active") {
      state.activeFilter = activeBtn;
      return state.todos.filter((todo) => !todo.completed);
    } else if (state.currentFilter === "completed") {
      state.activeFilter = completedBtn;
      return state.todos.filter((todo) => todo.completed);
    }
  };

  const getSortedTodos = (filteredTodos) => {
    if (state.currentSort === "newest") {
      state.activeSort = newestBtn;
      return [...filteredTodos].sort((a, b) => b.createdAt - a.createdAt);
    }

    if (state.currentSort === "oldest") {
      state.activeSort = oldestBtn;
      return [...filteredTodos].sort((a, b) => a.createdAt - b.createdAt);
    }

    return filteredTodos;
  };

  const handleAddTodo = () => {
    const text = todoInput.value.trim();
    if (!text) return;
    addTodo(text);
    todoInput.value = "";
    renderTodos();
  };

  const renderTodoList = (todoItems) => {
    todoItems.forEach((todo) => {
      createTodoElement(todo, todoList, actions);
    });
  };

  const updateButtonState = (buttons, activeBtn, className) => {
    buttons.forEach((btn) => {
      btn.classList.remove(className);
    });

    if (activeBtn) {
      activeBtn.classList.add(className);
    }
  };

  const updateActiveButtons = () => {
    updateButtonState(filterBtns, state.activeFilter, "activeFilterBtn");
    updateButtonState(sortBtns, state.activeSort, "activeSortBtn");
  };

  const renderTodos = () => {
    todoList.innerHTML = "";
    const filteredTodos = getFilteredTodos();
    const sortedTodos = getSortedTodos(filteredTodos);
    renderTodoList(sortedTodos);
    updateActiveButtons();
    updateItemsLeft();
  };

  const actions = {
    toggleTodo(id, checked) {
      toggleTodo(id, checked);
      renderTodos();
    },

    deleteTodo(id) {
      deleteTodo(id);
      renderTodos();
    },
  };

  const saveFilter = (filter) => {
    localStorage.setItem("filter", filter);
  };

  const loadFilter = () => {
    const savedFilter = localStorage.getItem("filter");
    return savedFilter ? savedFilter : "all";
  };

  const changeFilter = (filter) => {
    state.currentFilter = filter;
    saveFilter(state.currentFilter);
    renderTodos();
  };

  const saveSort = (sort) => {
    localStorage.setItem("sort", sort);
  };

  const loadSort = () => {
    const savedSort = localStorage.getItem("sort");
    return savedSort ? savedSort : "newest";
  };

  addBtn.addEventListener("click", handleAddTodo);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") handleAddTodo();
  });

  clearCompletedBtn.addEventListener("click", function () {
    state.todos = state.todos.filter((todo) => !todo.completed);
    saveTodos(state.todos);
    renderTodos();
  });

  allBtn.addEventListener("click", function () {
    changeFilter("all");
  });

  activeBtn.addEventListener("click", function () {
    changeFilter("active");
  });

  completedBtn.addEventListener("click", function () {
    changeFilter("completed");
  });

  newestBtn.addEventListener("click", function () {
    state.currentSort = "newest";
    saveSort(state.currentSort);
    renderTodos();
  });

  oldestBtn.addEventListener("click", function () {
    state.currentSort = "oldest";
    saveSort(state.currentSort);
    renderTodos();
  });

  state.todos = loadTodos();
  state.currentFilter = loadFilter();
  state.currentSort = loadSort();
  renderTodos();
});
