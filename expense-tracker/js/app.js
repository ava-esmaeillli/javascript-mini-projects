import { state } from "./state.js";
import {
  handleExpenseSubmit,
  deleteExpense,
  editExpense,
  calculateTotal,
} from "./expenses.js";
import { getVisibleExpenses } from "./filters.js";
import { saveExpenses, loadExpenses } from "./storage.js";
import { renderExpenses } from "./ui.js";

const titleInput = document.getElementById("titleInput");
const amountInput = document.getElementById("amountInput");
const categorySelect = document.getElementById("categorySelect");
const addBtn = document.getElementById("addBtn");
const sortFilter = document.getElementById("sortFilter");
const categoryFilter = document.getElementById("categoryFilter");

export const updateUI = () => {
  renderExpenses();
};

addBtn.addEventListener("click", function(){
  handleExpenseSubmit();
  updateUI();
});

expenseList.addEventListener("click", function (e) {
  const action = e.target.dataset.action;

  if (action === "delete") {
    deleteExpense(e.target.dataset.id);
    updateUI();
  } else if (action === "edit") {
    editExpense(e.target.dataset.id);
  }
});

sortFilter.addEventListener("change", function () {
  state.sort = this.value;
  updateUI();
});

categoryFilter.addEventListener("change", function () {
  state.category = this.value;
  updateUI();
});

loadExpenses();
updateUI();
