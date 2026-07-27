import { state } from "./state.js";
import { getVisibleExpenses } from "./filters.js";
import { calculateTotal } from "./expenses.js";

const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");

export const renderExpenses = () => {
  expenseList.innerHTML = "";
  const expensesToRender = getVisibleExpenses();

  totalAmount.innerText = `Total: $${calculateTotal(expensesToRender)}`;

  expensesToRender.forEach((expense) => {
    const expenseItem = document.createElement("li");
    const expenseTitle = document.createElement("span");
    const expenseAmount = document.createElement("span");
    const expenseCategory = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");

    expenseTitle.innerText = expense.title;
    expenseAmount.innerText = expense.amount;
    expenseCategory.innerText = expense.category;
    deleteBtn.innerText = "Delete";
    deleteBtn.dataset.action = "delete";
    deleteBtn.dataset.id = expense.id;
    editBtn.innerText = "Edit";
    editBtn.dataset.action = "edit";
    editBtn.dataset.id = expense.id;

    expenseTitle.className = "expense-title";
    expenseAmount.className = "expense-amount";
    expenseCategory.className = "expense-category";
    deleteBtn.className = "delete-btn";
    editBtn.className = "edit-btn";

    expenseItem.append(
      expenseTitle,
      expenseAmount,
      expenseCategory,
      editBtn,
      deleteBtn,
    );
    expenseList.append(expenseItem);
  });
};
