import React from 'react';
import { View, StyleSheet } from 'react-native';
import BudgetSummary from '../components/BudgetSummary';

export default function BudgetPage() {
    return (
        <View style={styles.budgetSummaries}>
            <BudgetSummary
                budget='needs'
                remaining={1234.56}
                total={1500}/>
            <BudgetSummary 
                budget='wants'
                remaining={-123.45}
                total={500}/>
        </View>
    )
}

const styles = StyleSheet.create({
    budgetSummaries: {
      flexDirection: 'row',
    },
  });
  