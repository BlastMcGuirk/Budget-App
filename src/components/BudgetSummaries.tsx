import React from 'react';
import { View } from 'react-native';
import BudgetSummary from '../components/BudgetSummary';
import { Layouts } from '../styles/global';

export default function BudgetSummaries() {
    return (
        <View style={Layouts.row}>
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
