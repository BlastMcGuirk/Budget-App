import { Budget } from '../interfaces/Budget';
import { BUDGET_TABLE_NAME, ITEM_TABLE_NAME } from './db-constants';
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

/*export const addBudget = (budgetName: string, budgetValue: number): Budget => {
    const { exec } = useDatabase();
    const query = `
        INSERT INTO ${BUDGET_TABLE_NAME} (budget_name, budget_value)
        VALUES (${budgetName}, ${budgetValue})
    `;
    return exec<Budget>(query, (data) => {
        return data.item(0);
    });
}

export const deleteBudget = (budget: Budget): void => {
    const { exec } = useDatabase();
    const query = `
        DELETE FROM ${BUDGET_TABLE_NAME}
        WHERE budget_id = ${budget.id}
    `;
    exec(query, (_) => {});
}

export const updateBudget = (budget: Budget): Budget => {
    const { exec } = useDatabase();
    const query = `
        UPDATE ${BUDGET_TABLE_NAME} 
        SET budget_name = ${budget.name},
            budget_value = ${budget.budgetValue}
        WHERE budget_id = ${budget.id}
    `;
    return exec<Budget>(query, (data) => {
        return data.item(0);
    });
}*/