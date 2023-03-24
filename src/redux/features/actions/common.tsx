import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBudgets } from "../../../database/db-table-budget";
import { getAllItems } from "../../../database/db-table-item";
import { RootState } from "../../store";

export const loadData = createAsyncThunk(
    'budgets/loadData',
    async (data, thunkAPI) => {
        const currentState = (thunkAPI.getState() as RootState).budgets;
        const month = currentState.month;
        const year = currentState.year;
        const budgetData = await fetchBudgetData(month, year);
        return {month, year, budgetData};
    }
);

export const prevMonth = createAsyncThunk(
    'budgets/prevMonth',
    async (data, thunkAPI) => {
        const currentState = (thunkAPI.getState() as RootState).budgets;
        const newMonth = (currentState.month == 1) ? 12 : (currentState.month - 1);
        const newYear = newMonth == 12 ? currentState.year - 1 : currentState.year;
        const budgetData = await fetchBudgetData(newMonth, newYear);
        return {newMonth, newYear, budgetData};
    }
);

export const nextMonth = createAsyncThunk(
    'budgets/nextMonth',
    async (data, thunkAPI) => {
        const currentState = (thunkAPI.getState() as RootState).budgets;
        const newMonth = (currentState.month == 12) ? 1 : (currentState.month + 1);
        const newYear = newMonth == 1 ? currentState.year + 1 : currentState.year;
        const budgetData = await fetchBudgetData(newMonth, newYear);
        return {newMonth, newYear, budgetData};
    }
);

export const fetchBudgetData = async (month: number, year: number) => {
    const budgets = await getAllBudgets();
    for (const budget of budgets) {
        const items = await getAllItems(budget.id, month, year);
        budget.items = items;
    }
    return budgets;
};