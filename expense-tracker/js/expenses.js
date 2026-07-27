import { state } from "./state.js";
import { saveExpenses } from "./storage.js";

export const handleExpenseSubmit = () => {
  if (
    titleInput.value.trim() === "" ||
    amountInput.value.trim() === "" ||
    categorySelect.value === ""
  ) {
    return;
  }

  if (state.editingId === null) {
    const expense = {
      id: crypto.randomUUID(),
      title: titleInput.value.trim(),
      amount: amountInput.value.trim(),
      category: categorySelect.value,
      createdAt: Date.now(),
    };

    state.expenses.push(expense);
    saveExpenses();

    titleInput.value = "";
    amountInput.value = "";
    categorySelect.value = "";
  } else {
    state.expenses = state.expenses.map((expense) => {
      if (expense.id === state.editingId) {
        return {
          ...expense,
          title: titleInput.value.trim(),
          amount: amountInput.value.trim(),
          category: categorySelect.value,
        };
      }
      return expense;
    });

    saveExpenses();

    titleInput.value = "";
    amountInput.value = "";
    categorySelect.value = "";

    state.editingId = null;
    addBtn.innerText = state.editingId ? "Update" : "Add";
  }
};

export const deleteExpense = (expenseId) => {
  state.expenses = state.expenses.filter((expense) => {
    return expense.id !== expenseId;
  });

  saveExpenses();
};

export const editExpense = (expenseId) => {
  const expense = state.expenses.find((expense) => {
    return expense.id === expenseId;
  });

  state.editingId = expenseId;
  addBtn.innerText = state.editingId ? "Update" : "Add";

  titleInput.value = expense.title;
  amountInput.value = expense.amount;
  categorySelect.value = expense.category;
};

export const calculateTotal = (expenses) => {
  return expenses.reduce((total, expense) => {
    return total + Number(expense.amount);
  }, 0);
};
