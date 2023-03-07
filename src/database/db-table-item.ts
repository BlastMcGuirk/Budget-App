import { Item } from '../interfaces/Item';
import { ITEM_TABLE_NAME } from './db-constants';
import { runQuery } from './db-functions';

export const getAllItems = (budgetId: number, month: number, year: number): Promise<Item[]> => {
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
        FROM ${ITEM_TABLE_NAME}
        WHERE
            budget_id = ${budgetId} AND
            year = ${year} AND
            month = ${month}
    `;
    return runQuery<Item>(query);
}

export interface ItemInput {
    budgetId: number;
    itemName: string;
    amount: number;
    year: string;
    month: string;
    day: string;
    category?: string;
}

export const addItem = async (input: ItemInput): Promise<Item> => {
    const { amount, budgetId, day, itemName, month, year, category } = input;
    console.log("AddItem", input);
    const query = `
        INSERT INTO ${ITEM_TABLE_NAME} (budget_id, item_name, amount, year, month, day, category)
        VALUES (${budgetId}, "${itemName}", ${amount}, ${year}, ${month}, ${day}, "${category ?? null}")
    `;
    const itemArr = await runQuery<Item>(query);
    return itemArr[0];
}

/*export const deleteItem = (itemId: number): void => {
    const { exec } = useDatabase();
    const query = `
        DELETE FROM ${ITEM_TABLE_NAME}
        WHERE item_id = ${itemId}
    `;
    exec(query, (_) => {});
}

export const updateItem = (item: Item): Item => {
    const { exec } = useDatabase();
    const query = `
        UPDATE ${ITEM_TABLE_NAME} 
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
*/