import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontSizes } from '../styles/global';

interface BudgetSummaryProps {
    budget: string;
    remaining: number;
    total: number;
}

export default function BudgetSummary(props: BudgetSummaryProps) {
    return (
        <View style={styles.container}>
            <Text style={FontSizes.L}>{props.budget.toUpperCase()}</Text>
            <Text style={[FontSizes.XL, props.remaining >= 0 ? styles.green : styles.red]}>${props.remaining}</Text>
            <Text style={FontSizes.S}>/ ${props.total}</Text>
        </View>
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
  