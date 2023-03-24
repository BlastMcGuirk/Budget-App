import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Budget } from '../../interfaces/Budget';
import { getAllBudgets } from '../../database/db-table-budget';
import { addItem, deleteItem, getAllItems, ItemInput, updateItem } from '../../database/db-table-item';
import { RootState } from '../store';
import { Item } from '../../interfaces/Item';
import { loadData, nextMonth, prevMonth } from './actions/common';
import { addNewItem, deleteAndRemoveItem, updateExistingItem } from './actions/items';
import { updateExistingBudget } from './actions/budgets';

export interface BudgetState {
    month: number;
    year: number;
    budgets: Budget[];
    loading: boolean;
}

const initialState: BudgetState = {
    month: (new Date()).getMonth() + 1,
    year: (new Date()).getFullYear(),
    budgets: [],
    loading: true
}

export const counterSlice = createSlice({
    name: 'budgets',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // Load data
            .addCase(loadData.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(loadData.fulfilled, (state, action) => {
                const { month, year, budgetData } = action.payload;
                state.month = month;
                state.year = year;
                state.budgets = budgetData;
                state.loading = false;
            })
            // Previous month
            .addCase(prevMonth.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(prevMonth.fulfilled, (state, action) => {
                const { newMonth, newYear, budgetData } = action.payload;
                state.month = newMonth;
                state.year = newYear;
                state.budgets = budgetData;
                state.loading = false;
            })
            // Next month
            .addCase(nextMonth.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(nextMonth.fulfilled, (state, action) => {
                const { newMonth, newYear, budgetData } = action.payload;
                state.month = newMonth;
                state.year = newYear;
                state.budgets = budgetData;
                state.loading = false;
            })

            // Update budget
            .addCase(updateExistingBudget.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(updateExistingBudget.fulfilled, (state, action) => {
                const { budgetData } = action.payload;
                state.budgets = budgetData;
                state.loading = false;
            })

            // Add new item
            .addCase(addNewItem.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(addNewItem.fulfilled, (state, action) => {
                const { budgetData } = action.payload;
                state.budgets = budgetData;
                state.loading = false;
            })

            // Update item
            .addCase(updateExistingItem.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(updateExistingItem.fulfilled, (state, action) => {
                const { budgetData } = action.payload;
                state.budgets = budgetData;
                state.loading = false;
            })

            // Delete item
            .addCase(deleteAndRemoveItem.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(deleteAndRemoveItem.fulfilled, (state, action) => {
                const { budgetData } = action.payload;
                state.budgets = budgetData;
                state.loading = false;
            })
    }
});

export const selectBudgets = (state: RootState) => state.budgets;

export default counterSlice.reducer;