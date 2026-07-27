import { state } from "./state.js";

export const saveExpenses = () => {
  localStorage.setItem("expenses", JSON.stringify(state.expenses));
};

export const loadExpenses = () => {
  const savedExpenses = localStorage.getItem("expenses");

  if (savedExpenses) {
    state.expenses = JSON.parse(savedExpenses);
  }
};
