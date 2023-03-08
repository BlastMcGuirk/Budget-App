import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useItem } from '../hooks/useItem';
import { Budget } from '../interfaces/Budget';
import { Item } from '../interfaces/Item';
import { FontSizes, Layouts } from '../styles/global';
import { DeleteItemDialog } from './DeleteItemDialog';
import ListItem from './ListItem';

export interface SpendingListProps {
    budget: Budget;
    items: Item[];
    onNavigate: (budgetId: number) => void;
    onNew: (budget: Budget) => void;
}

export default function SpendingList(props: SpendingListProps) {
    const { item, setItem, clearItem } = useItem();
    return (
        <>
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={Layouts.row}>
                    <Text style={FontSizes.L}>{props.budget.name}</Text>
                    <Text
                        style={FontSizes.L} 
                        onPress={() => props.onNew(props.budget)}
                        >
                        + New
                    </Text>
                </View>
            </View>
            {props.items.slice(-3).reverse().map((item, index) => {
                return <ListItem key={item.name + index} item={item} onLongPress={() => setItem(item)} />
            })}
            <View style={styles.footer}>
                <Text
                    style={FontSizes.M}
                    onPress={() => props.onNavigate(props.budget.id)}
                    >
                    See All
                </Text>
            </View>
        </View>
        <DeleteItemDialog item={item} clearItem={clearItem}  />
        </>
    )
}

const padding = 8;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderTopWidth: 2,
    },
    header: {
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
        padding
    },
    footer: {
        borderBottomWidth: 2,
        padding
    },

});