import { Item } from "./Item";

export interface Budget {
    id: number;
    name: string;
    budgetValue: number;
    items: Item[];
}