import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import BudgetSummary from '../components/BudgetSummary';
import { RootState } from '../redux/store';
import { Layouts } from '../styles/global';

export default function BudgetSummaries() {
    const { budgets } = useSelector((state: RootState) => state.budgets);
    return (
        <View style={Layouts.row}>
            {budgets.map(budget => {
                return <BudgetSummary 
                    key={budget.id}
                    budget={budget} />
            })}
        </View>
    )
}
