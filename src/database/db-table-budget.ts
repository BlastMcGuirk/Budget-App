import { Budget } from '../interfaces/Budget';
import { BUDGET_TABLE_NAME } from './db-constants';
import { runQuery } from './db-functions';

export const getAllBudgets = (): Promise<Budget[]> => {
    const query = `
        SELECT 
            budget_id as id,
            budget_name as name,
            budget_value as budgetValue
        FROM ${BUDGET_TABLE_NAME}
    `;
    return runQuery<Budget>(query);
}

export const addBudget = async (budgetName: string, budgetValue: number): Promise<Budget> => {
    const query = `
        INSERT INTO ${BUDGET_TABLE_NAME} (budget_name, budget_value)
        VALUES (${budgetName}, ${budgetValue})
    `;
    const budgetArr = await runQuery<Budget>(query);
    return budgetArr[0];
}

export const deleteBudget = (budgetId: number): void => {
    const query = `
        DELETE FROM ${BUDGET_TABLE_NAME}
        WHERE budget_id = ${budgetId}
    `;
    runQuery(query);
}

export const updateBudget = async (budget: Budget): Promise<Budget> => {
    const query = `
        UPDATE ${BUDGET_TABLE_NAME} 
        SET budget_name = "${budget.name}",
            budget_value = ${budget.budgetValue}
        WHERE budget_id = ${budget.id}
    `;
    const budgetArr = await runQuery<Budget>(query);
    return budgetArr[0];
}