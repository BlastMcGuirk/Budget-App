import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Budget } from '../../interfaces/Budget';
import { getAllBudgets } from '../../database/db-table-budget';
import { getAllItems } from '../../database/db-table-item';
import { RootState } from '../store';

export const prevMonth = createAsyncThunk(
    'budgets/loadData',
    async (data, thunkAPI) => {
        const currentState = (thunkAPI.getState() as RootState).budgets;
        const newMonth = (currentState.month == 1) ? 12 : (currentState.month - 1);
        const newYear = newMonth == 12 ? currentState.year - 1 : currentState.year;
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
        builder.addCase(prevMonth.pending, (state, _) => {
            state.loading = true;
        })
        builder.addCase(prevMonth.fulfilled, (state, action) => {
            const { newMonth, newYear, budgetData } = action.payload;
            state.month = newMonth;
            state.year = newYear;
            state.budgets = budgetData;
            state.loading = false;

        })
    }
});

export default counterSlice.reducer;