import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { RootStackParamList } from '../App';
import BudgetSummaries from '../components/BudgetSummaries';
import SpendingList from '../components/SpendingList';
import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { DateNavigator } from '../components/DateNavigator';
import { loadData } from '../redux/features/actions/common';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home(props: Props) {
    const {budgets, loading} = useSelector((state: RootState) => state.budgets);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadData());
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {loading && <Text>Loading...</Text>}
            {!loading && <>
                <DateNavigator />
                <BudgetSummaries />
                {budgets.map(budget => {
                    return <SpendingList 
                        key={budget.id}
                        budget={budget} />
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
