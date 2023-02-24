import { useDatabase } from './db-service';
import {TABLE_NAME as BUDGET_TABLE_NAME} from './db-table-budget';

export interface Item {
    id: number;
    budgetId: number;
    name: string;
    amount: number;
    year: string;
    month: string;
    day: string;
    category?: string;
}

export const TABLE_NAME = 'item';

export const CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
    item_id INTEGER PRIMARY KEY,
    budget_id INTEGER NOT NULL,
    FOREIGN KEY (budget_id)
        REFERENCES ${BUDGET_TABLE_NAME} (budget_id)
    item_name TEXT NOT NULL,
    amount REAL NOT NULL,
    year TEXT NOT NULL,
    month TEXT NOT NULL,
    day TEXT NOT NULL,
    category TEXT
);
`;

export const getAllItems = (budgetId: number, year: string, month: string): Item[] => {
    const { exec } = useDatabase();
    const query = `
        SELECT 
            item_id as id,
            budget_id as budgetId,
            item_name as name,
            amount,
            year,
            month,
            day,
            category 
        FROM ${TABLE_NAME}
        WHERE
            budget_id = ${budgetId} AND
            year = ${year} AND
            month = ${month}
    `;
    return exec<Item[]>(query, (data) => {
        return data._array;
    });
}

export const addItem = ( 
    budgetId: number,
    itemName: string,
    amount: number,
    year: string,
    month: string,
    day: string,
    category?: string): Item => {
    const { exec } = useDatabase();
    const query = `
        INSERT INTO ${TABLE_NAME} (budget_id, item_name, amount, year, month, day, category)
        VALUES (${budgetId}, ${itemName}, ${amount}, ${year}, ${month}, ${day}, ${category ?? null})
    `;
    return exec<Item>(query, (data) => {
        return data.item(0);
    });
}

export const deleteItem = (itemId: number): void => {
    const { exec } = useDatabase();
    const query = `
        DELETE FROM ${TABLE_NAME}
        WHERE item_id = ${itemId}
    `;
    exec(query, (_) => {});
}

export const updateItem = (item: Item): Item => {
    const { exec } = useDatabase();
    const query = `
        UPDATE ${TABLE_NAME} 
        SET 
            item_name = ${item.name},
            amount = ${item.amount},
            year = ${item.year},
            month = ${item.month},
            day = ${item.day},
            category = ${item.category ?? null}
        WHERE item_id = ${item.id}
    `;
    return exec<Item>(query, (data) => {
        return data.item(0);
    });
}
