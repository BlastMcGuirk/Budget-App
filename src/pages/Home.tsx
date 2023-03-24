import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { RootStackParamList } from '../App';
import BudgetSummaries from '../components/BudgetSummaries';
import SpendingList from '../components/SpendingList';
import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { loadData } from '../redux/features/budget-slice';
import { DateNavigator } from '../components/DateNavigator';
import { Budget } from '../interfaces/Budget';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home(props: Props) {
    const {budgets, loading} = useSelector((state: RootState) => state.budgets);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadData());
    }, []);

    const navigateToBudgetDetails = function(budgetId: number) {
        props.navigation.navigate("BudgetDetails", {budgetId: budgetId});
    }

    const navigateToNew = function(budget: Budget) {
        props.navigation.navigate("NewEntry", {budget, returnTo: 'Home', returnProps: undefined});
    }

    const navigateToItemDetails = function(budgetId: number, itemId: number) {
        props.navigation.navigate("ItemDetails", { budgetId, itemId });
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {loading && <Text>Loading...</Text>}
            {!loading && <>
                <DateNavigator />
                <BudgetSummaries />
                {budgets.map(budget => {
                    return <SpendingList 
                        key={budget.id}
                        budget={budget}
                        items={budget.items}
                        onNew={navigateToNew}
                        onNavigateBudget={navigateToBudgetDetails}
                        onNavigateItem={navigateToItemDetails} />
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
