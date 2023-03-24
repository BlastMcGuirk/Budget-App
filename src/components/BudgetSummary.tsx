import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { RootStackParamList } from '../App';
import { Budget } from '../interfaces/Budget';
import { FontSizes } from '../styles/global';

interface BudgetSummaryProps {
    budget: Budget;
}

export default function BudgetSummary(props: BudgetSummaryProps) {
    const { budget } = props;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const remaining = useMemo(() => {
        const sum = budget.items.reduce((acc, cur) => acc + cur.amount, 0);
        return budget.budgetValue - sum;
    }, [budget])

    return (
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate("BudgetDetails", {budgetId: budget.id})}>
            <View style={styles.container}>
                <Text style={FontSizes.L}>{budget.name.toUpperCase()}</Text>
                <Text style={[FontSizes.XL, remaining >= 0 ? styles.green : styles.red]}>${parseFloat(remaining.toFixed(2))}</Text>
                <Text style={FontSizes.S}>/ ${props.budget.budgetValue}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    green: {
        color: 'green'
    },
    red: {
        color: 'red'
    }
});
  