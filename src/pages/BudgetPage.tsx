import React from 'react';
import { View, StyleSheet } from 'react-native';
import BudgetSummaries from '../components/BudgetSummaries';
import { Item } from '../components/ListItem';
import SpendingList from '../components/SpendingList';

const dummyNeedsItems: Item[] = [
    {
        name: "Rent",
        category: "Bills",
        amount: 852.25,
        date: "8/4/2022"
    },
    {
        name: "Groceries",
        category: "Groceries",
        amount: 130.44,
        date: "8/7/2022"
    }
]

const dummyWantsItems: Item[] = [
    {
        name: "Date Night",
        amount: 56,
        date: "8/12/2022"
    }
]

export default function BudgetPage() {
    return (
        <View style={styles.container}>
            <BudgetSummaries />
            <SpendingList budget='Needs' items={dummyNeedsItems} />
            <SpendingList budget='Wants' items={dummyWantsItems} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});
