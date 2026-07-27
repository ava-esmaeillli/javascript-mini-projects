# ✅ Todo App

A modern and minimal Todo application built with **HTML, CSS, and Vanilla JavaScript**.

This project focuses on clean code structure, state management, local storage persistence, and modular JavaScript architecture.

---

## 🚀 Features

- Add new todos
- Delete todos
- Mark todos as completed
- Filter tasks:
  - All
  - Active
  - Completed
- Sort tasks:
  - Newest first
  - Oldest first
- Clear completed tasks
- Data persistence using LocalStorage
- Responsive design
- Modular JavaScript structure

---

## 🛠️ Technologies

- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage API

---

## 📂 Project Structure

```
Todo-App
│
├── index.html
├── style.css
│
└── js
    │
    ├── script.js
    ├── state.js
    ├── storage.js
    ├── todos.js
    └── ui.js
```

---

## 🧩 Architecture

The project is separated into different responsibilities:

### state.js
Stores the application's current state.

Example:
- Todos data
- Current filter
- Current sorting method


### storage.js
Handles saving and loading data from LocalStorage.


### todos.js
Contains Todo business logic:

- Add todo
- Delete todo
- Toggle completed status


### ui.js
Responsible for creating and updating UI elements.


### script.js
Acts as the main controller that connects all modules together.

---

## 💡 What I Learned

While building this project, I practiced:

- Managing application state
- Working with arrays and array methods
- Using LocalStorage
- Creating reusable functions
- Separating UI and business logic
- Using ES Modules
- Improving code organization through refactoring

---

## 📸 Preview

![Todo App Preview](./assets/preview.png)

---

## ▶️ How to Run

1. Clone this repository:

```bash
git clone https://github.com/your-username/todo-app.git
```

2. Open the project folder.

3. Run `index.html` using a local server.

---

## 📌 Future Improvements

- Add dark mode
- Add edit todo feature
- Add animations
- Connect to a backend API
- Add user authentication

---

## 🌐 Live Demo

[View Live Demo](https://ava-esmaeillli.github.io/javascript-todo-app/)

## 👩‍💻 Author
Created by Ava
