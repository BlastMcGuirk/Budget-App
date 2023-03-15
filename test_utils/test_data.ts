import { PreloadedState } from "@reduxjs/toolkit";
import { Item } from "../src/interfaces/Item";
import { RootState } from "../src/redux/store";

export function generateCommonTestData(): PreloadedState<RootState> {
    return {
        budgets: {
            loading: false,
            month: 4,
            year: 2023,
            budgets: [
                {
                    id: 1,
                    name: "Needs",
                    budgetValue: 2000,
                    items: [
                        generateItem(),
                        generateItem(),
                        generateItem(),
                    ]
                },
                {
                    id: 2,
                    name: "Wants",
                    budgetValue: 1200,
                    items: [
                        generateItem(),
                        generateItem(),
                        generateItem(),
                        generateItem(),
                        generateItem(),
                    ]
                }
            ]
        }
    }
}

export function generateItem(): Item {
    return {
        id: Math.floor(Math.random() * 10000000),
        name: "TestItem",
        budgetId: Math.random() > .5 ? 1 : 2,
        amount: parseFloat((Math.random() * 1000).toFixed(2)),
        day: Math.floor(Math.random() * 31).toString(),
        month: Math.floor(Math.random() * 12).toString(),
        year: "2023",
    }
}