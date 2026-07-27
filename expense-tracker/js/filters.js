import { state } from "./state.js";

export const getVisibleExpenses = () => {
  let result = [...state.expenses];

  if (state.category !== "all") {
    result = result.filter((expense) => {
      return expense.category === state.category;
    });
  }

  if (state.sort === "newest") {
    result.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
  }

  if (state.sort === "oldest") {
    result.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });
  }

  return result;
};
