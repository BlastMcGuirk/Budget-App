import { createAsyncThunk } from "@reduxjs/toolkit";
import { addBudget, deleteBudget, updateBudget } from "../../../database/db-table-budget";
import { Budget } from "../../../interfaces/Budget";
import { RootState } from "../../store";
import { fetchBudgetData } from "./common";

/*export const addNewBudget = createAsyncThunk(
    'budgets/add',
    async (data: ItemInput, thunkAPI) => {
        const currentState = (thunkAPI.getState() as RootState).budgets;

        // Add the item to the database
        await addItem(data);

        // Reload the data using the curent month and year
        const month = currentState.month;
        const year = currentState.year;
        const budgetData = await fetchBudgetData(month, year);
        return {budgetData};
    }
)*/

export const updateExistingBudget = createAsyncThunk(
    'budgets/update',
    async (data: Budget, thunkAPI) => {
        const currentState = (thunkAPI.getState() as RootState).budgets;

        // Add the item to the database
        await updateBudget(data);

        // Reload the data using the curent month and year
        const month = currentState.month;
        const year = currentState.year;
        const budgetData = await fetchBudgetData(month, year);
        return {budgetData};
    }
)

export const deleteAndRemoveBudget = createAsyncThunk(
    'budgets/delete',
    async (budgetId: number, thunkAPI) => {
        const currentState = (thunkAPI.getState() as RootState).budgets;

        await deleteBudget(budgetId);

        const month = currentState.month;
        const year = currentState.year;
        const budgetData = await fetchBudgetData(month, year);
        return {budgetData};
    }
)
