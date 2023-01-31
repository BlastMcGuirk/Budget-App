import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { RootStackParamList } from '../App';
import BudgetSummaries from '../components/BudgetSummaries';
import { Item } from '../components/ListItem';
import SpendingList from '../components/SpendingList';
import { Layouts } from '../styles/global';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

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
    },
    {
        name: "Rent1",
        category: "Bills",
        amount: 852.25,
        date: "8/4/2022"
    },
    {
        name: "Rent2",
        category: "Bills",
        amount: 852.25,
        date: "8/4/2022"
    },
    {
        name: "Rent3",
        category: "Bills",
        amount: 852.25,
        date: "8/4/2022"
    },
    {
        name: "Rent4",
        category: "Bills",
        amount: 852.25,
        date: "8/4/2022"
    },
    {
        name: "Rent5",
        category: "Bills",
        amount: 852.25,
        date: "8/4/2022"
    },
    {
        name: "Rent6",
        category: "Bills",
        amount: 852.25,
        date: "8/4/2022"
    },
    {
        name: "Rent7",
        category: "Bills",
        amount: 852.25,
        date: "8/4/2022"
    },
]

const dummyWantsItems: Item[] = [
    {
        name: "Date Night",
        amount: 56,
        date: "8/12/2022"
    },
    {
        name: "Rent3",
        category: "Bills",
        amount: 852.25,
        date: "8/4/2022"
    },
    {
        name: "Rent4",
        category: "Bills",
        amount: 852.25,
        date: "8/4/2022"
    },
    {
        name: "Rent5",
        category: "Bills",
        amount: 852.25,
        date: "8/4/2022"
    },
]

export default function Home(props: Props) {

    const navigateToDetails = function(budget: string, items: Item[]) {
        props.navigation.navigate("BudgetDetails", {budget, items});
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <BudgetSummaries />
            <SpendingList budget='Needs' items={dummyNeedsItems} onNavigate={navigateToDetails} />
            <SpendingList budget='Wants' items={dummyWantsItems} onNavigate={navigateToDetails} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});
