import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Budget } from '../../interfaces/Budget';
import { getAllBudgets } from '../../database/db-table-budget';
import { addItem, deleteItem, getAllItems, ItemInput } from '../../database/db-table-item';
import { RootState } from '../store';

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

const fetchBudgetData = async (month: number, year: number) => {
    const budgets = await getAllBudgets();
    for (const budget of budgets) {
        budget.items = await getAllItems(budget.id, month, year);
    }
    return budgets;
};

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

            // Add new item
            .addCase(addNewItem.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(addNewItem.fulfilled, (state, action) => {
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