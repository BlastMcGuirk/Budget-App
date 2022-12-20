import React from 'react';
import { View, StyleSheet } from 'react-native';
import BudgetSummaries from '../components/BudgetSummaries';

export default function BudgetPage() {
    return (
        <View style={styles.container}>
            <BudgetSummaries />
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
