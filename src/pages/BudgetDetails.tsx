import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../App';
import { BudgetSummary } from '../components/BudgetSummary';
import { DeleteItemDialog } from '../components/DeleteItemDialog';
import { ListItem } from '../components/ListItem';
import { useDialogContext } from '../hooks/useDialogContext';
import { useRefresh } from '../hooks/useRefresh';
import { Budget } from '../interfaces/Budget';
import { Item } from '../interfaces/Item';
import { RootState } from '../redux/store';
import { FontSizes } from '../styles/global';

export interface BudgetDetailsProps {
    budgetId: number;
}

type Props = NativeStackScreenProps<RootStackParamList, 'BudgetDetails'>;

export function BudgetDetails(props: Props) {
    const { budgets, loading } = useSelector((state: RootState) => state.budgets);
    const { budgetId } = props.route.params;
    const { refresh } = useRefresh();

    const budget = budgets.find(b => b.id === budgetId)!;

    React.useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => 
                <Icon 
                    style={[FontSizes.L]}
                    name='edit'
                    onPress={() => {props.navigation.navigate('EditBudget', { budget, onSave: () => refresh() })}} />
        })
    }, [budget]);

    const dialogContext = useDialogContext<Item>();

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
                <BudgetSummary budget={budget} />
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
                    onLongPress={() => dialogContext.setContext(item)} />
            })}
        </ScrollView>
        <DeleteItemDialog context={dialogContext} />
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