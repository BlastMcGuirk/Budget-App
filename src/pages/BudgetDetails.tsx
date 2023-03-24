import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../App';
import BudgetSummary from '../components/BudgetSummary';
import { DeleteItemDialog } from '../components/DeleteItemDialog';
import ListItem from '../components/ListItem';
import { useItem } from '../hooks/useItem';
import { Budget } from '../interfaces/Budget';
import { Item } from '../interfaces/Item';
import { RootState } from '../redux/store';
import { FontSizes } from '../styles/global';

export interface BudgetDetailsProps {
    budgetId: number;
}

type Props = NativeStackScreenProps<RootStackParamList, 'BudgetDetails'>;

export default function BudgetDetails(props: Props) {
    const { budgets, loading } = useSelector((state: RootState) => state.budgets);
    const { budgetId } = props.route.params;

    const { budget, remaining } = useMemo(() => {
        const b = budgets.find(b => b.id === budgetId)!;
        const sum = b.items.reduce((acc, cur) => acc + cur.amount, 0);
        return {budget: b, remaining: b.budgetValue - sum};
    }, [budgets, budgetId]);

    const { item, setItem, clearItem } = useItem();

    const navigateToNew = function(budget: Budget) {
        props.navigation.navigate("NewEntry", {budget, returnTo: 'BudgetDetails', returnProps: {budgetId}});
    }

    const navigateToItemDetails = function(budgetId: number, itemId: number) {
        props.navigation.navigate("ItemDetails", { budgetId, itemId });
    }

    return (
        <>
        <ScrollView key={budget.id} contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <BudgetSummary budget={budget.name} remaining={parseFloat(remaining.toFixed(2))} total={budget.budgetValue} />
                <Text
                    style={[styles.new, FontSizes.S]}
                    onPress={() => navigateToNew(budget)}
                    >
                    New Entry...
                </Text>
            </View>
            {budget.items.slice().reverse().map(item => {
                return <ListItem 
                    key={item.id}
                    item={item}
                    onPress={() => navigateToItemDetails(item.budgetId, item.id)}
                    onLongPress={() => setItem(item)} />
            })}
        </ScrollView>
        <DeleteItemDialog item={item} clearItem={clearItem} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    header: {
        borderBottomWidth: 2,
        width: '100%',
    },
    new: {
        borderTopWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 8
    }
});