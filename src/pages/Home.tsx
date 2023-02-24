import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { RootStackParamList } from '../App';
import BudgetSummaries from '../components/BudgetSummaries';
import { Item } from '../database/db-table-item';
import SpendingList from '../components/SpendingList';
import { useDatabase } from '../database/db-service';
import { Budget } from '../database/db-table-budget';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home(props: Props) {

    const db = useDatabase();

    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2023);
    const [loading, setLoading] = useState(true);
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        setLoading(true);
        db.getAllBudgets().then(bs => {
            setBudgets(bs);
            bs.forEach(budget => {
                db.getAllItems(budget.id, year.toString(), month.toString()).then(is => {
                    setItems(is);
                    setLoading(false);
                })
            })
        });
    }, [month, year])

    const navigateToDetails = function(budget: string, items: Item[]) {
        props.navigation.navigate("BudgetDetails", {budget, items});
    }

    const navigateToNew = function(budget: string) {
        props.navigation.navigate("NewEntry", {budget, returnTo: 'Home', returnProps: undefined});
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {loading && <Text>Loading...</Text>}
            {!loading && <>
                <BudgetSummaries />
                {budgets.map(budget => {
                    return <SpendingList 
                    key={budget.id} 
                    budget={budget.name} 
                    items={items} 
                    onNew={navigateToNew} 
                    onNavigate={navigateToDetails} />
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
