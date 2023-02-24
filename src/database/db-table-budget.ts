import { useDatabase } from './db-service';

export interface Budget {
    id: number;
    name: string;
    budgetValue: number;
}

export const TABLE_NAME = 'budget';

export const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
        budget_id INTEGER PRIMARY KEY,
        budget_name TEXT NOT NULL UNIQUE
        budget_value REAL NOT NULL
    );
`;

export const getAllBudgets = (): Budget[] => {
    const { exec } = useDatabase();
    const query = `
        SELECT 
            budget_id as id,
            budget_name as name,
            budget_value as budgetValue
        FROM ${TABLE_NAME}
    `;
    return exec<Budget[]>(query, (data) => {
        return data._array;
    });
}

export const addBudget = (budgetName: string, budgetValue: number): Budget => {
    const { exec } = useDatabase();
    const query = `
        INSERT INTO ${TABLE_NAME} (budget_name, budget_value)
        VALUES (${budgetName}, ${budgetValue})
    `;
    return exec<Budget>(query, (data) => {
        return data.item(0);
    });
}

export const deleteBudget = (budget: Budget): void => {
    const { exec } = useDatabase();
    const query = `
        DELETE FROM ${TABLE_NAME}
        WHERE budget_id = ${budget.id}
    `;
    exec(query, (_) => {});
}

export const updateBudget = (budget: Budget): Budget => {
    const { exec } = useDatabase();
    const query = `
        UPDATE ${TABLE_NAME} 
        SET budget_name = ${budget.name},
            budget_value = ${budget.budgetValue}
        WHERE budget_id = ${budget.id}
    `;
    return exec<Budget>(query, (data) => {
        return data.item(0);
    });
}