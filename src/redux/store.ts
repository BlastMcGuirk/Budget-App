import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import budgetReducer from './features/budget-slice';

export const store = configureStore({
  reducer: {
    budgets: budgetReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();