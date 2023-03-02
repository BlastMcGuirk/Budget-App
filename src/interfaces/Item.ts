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