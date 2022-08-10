import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BudgetSummaryProps {
    budget: string;
    remaining: number;
    total: number;
}

export default function BudgetSummary(props: BudgetSummaryProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.budgetName}>{props.budget.toUpperCase()}</Text>
            <Text style={[styles.remaining, props.remaining >= 0 ? styles.green : styles.red]}>${props.remaining}</Text>
            <Text style={styles.total}>/ ${props.total}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    budgetName: {
        fontSize: 22
    },
    remaining: {
        fontSize: 36
    },
    total: {
        fontSize: 16
    },
    green: {
        color: 'green'
    },
    red: {
        color: 'red'
    }
  });
  