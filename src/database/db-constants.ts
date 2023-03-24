export const BUDGET_TABLE_NAME = 'budget';

export const BUDGET_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS ${BUDGET_TABLE_NAME} (
    budget_id INTEGER PRIMARY KEY,
    budget_name TEXT NOT NULL UNIQUE,
    budget_value REAL NOT NULL
);
`;

export const BUDGET_COUNT = `
SELECT count(*) as count FROM ${BUDGET_TABLE_NAME};
`;

export const BUDGET_ADD_DEFAULTS = `
INSERT INTO ${BUDGET_TABLE_NAME} (budget_id, budget_name, budget_value)
VALUES
    (1, "Needs", 2000.00),
    (2, "Wants", 1200.00);
`;

export const ITEM_TABLE_NAME = 'item';

export const ITEM_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS ${ITEM_TABLE_NAME}(
    item_id INTEGER PRIMARY KEY,
    budget_id INTEGER NOT NULL,
    item_name TEXT NOT NULL,
    amount REAL NOT NULL,
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,
    day INTEGER NOT NULL,
    category TEXT,
    FOREIGN KEY (budget_id) REFERENCES ${BUDGET_TABLE_NAME} (budget_id)
);
`;

