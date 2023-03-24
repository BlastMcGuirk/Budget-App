import { createAsyncThunk } from "@reduxjs/toolkit";
import { addItem, deleteItem, ItemInput, updateItem } from "../../../database/db-table-item";
import { Item } from "../../../interfaces/Item";
import { RootState } from "../../store";
import { fetchBudgetData } from "./common";

export const addNewItem = createAsyncThunk(
    'items/add',
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
)

export const updateExistingItem = createAsyncThunk(
    'items/update',
    async (data: Item, thunkAPI) => {
        const currentState = (thunkAPI.getState() as RootState).budgets;

        // Add the item to the database
        await updateItem(data);

        // Reload the data using the curent month and year
        const month = currentState.month;
        const year = currentState.year;
        const budgetData = await fetchBudgetData(month, year);
        
        return {budgetData};
    }
)

export const deleteAndRemoveItem = createAsyncThunk(
    'items/delete',
    async (itemId: number, thunkAPI) => {
        const currentState = (thunkAPI.getState() as RootState).budgets;

        await deleteItem(itemId);

        const month = currentState.month;
        const year = currentState.year;
        const budgetData = await fetchBudgetData(month, year);
        return {budgetData};
    }
)