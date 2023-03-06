import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { RootStackParamList } from '../App';
import BudgetSummaries from '../components/BudgetSummaries';
import SpendingList from '../components/SpendingList';
import { RootState, useAppDispatch } from '../redux/store';
import { Item } from '../interfaces/Item';
import { useSelector } from 'react-redux';
import { loadData } from '../redux/features/budget-slice';
import { DatePicker } from '../components/DatePicker';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home(props: Props) {
    const {budgets, loading} = useSelector((state: RootState) => state.budgets);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadData());
    }, []);

    const navigateToDetails = function(budget: string, items: Item[]) {
        props.navigation.navigate("BudgetDetails", {budget, items});
    }

    const navigateToNew = function(budget: string) {
        props.navigation.navigate("NewEntry", {budget, returnTo: 'Home', returnProps: undefined});
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {loading && <Text>Loading...</Text>}
            {!loading && <>
                <DatePicker />
                <BudgetSummaries />
                {budgets.map(budget => {
                    return <SpendingList 
                        key={budget.id}
                        budget={budget.name}
                        items={budget.items}
                        onNew={navigateToNew}
                        onNavigate={navigateToDetails} />
                })}
            </>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});
