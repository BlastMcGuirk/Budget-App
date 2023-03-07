import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from '../App';
import BudgetSummary from '../components/BudgetSummary';
import ListItem from '../components/ListItem';
import { Budget } from '../interfaces/Budget';
import { Item } from '../interfaces/Item';
import { FontSizes } from '../styles/global';

export interface BudgetDetailsProps {
    budget: Budget;
    items: Item[];
}

type Props = NativeStackScreenProps<RootStackParamList, 'BudgetDetails'>;

export default function BudgetDetails(props: Props) {
    const { budget, items } = props.route.params;
    const sum = useMemo(() => {
        return items.reduce((acc, cur) => acc + cur.amount, 0);
    }, items);
    return (
        <ScrollView key={budget.id} contentContainerStyle={styles.container}>
            {/*<Text style={[FontSizes.XL, styles.title]}>{budget}</Text>*/}
            <View style={styles.header}>
                <BudgetSummary budget={budget.name} remaining={sum} total={budget.budgetValue} />
                <Text
                    style={[styles.new, FontSizes.S]}
                    onPress={() => console.log("Hello")}
                >
                    New Entry...
                </Text>
            </View>
            {items.map(item => {
                return <ListItem key={item.id} item={item}/>
            })}
        </ScrollView>
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