import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Budget } from '../interfaces/Budget';
import { Item } from '../interfaces/Item';
import { FontSizes, Layouts } from '../styles/global';
import ListItem from './ListItem';

export interface SpendingListProps {
    budget: Budget;
    items: Item[];
    onNavigate: (budget: Budget, items: Item[]) => void;
    onNew: (budget: Budget) => void;
}

export default function SpendingList(props: SpendingListProps) {
    return (
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
            {props.items.slice(0, 3).map((item, index) => {
                return <ListItem key={item.name + index} item={item}/>
            })}
            <View style={styles.footer}>
                <Text
                    style={FontSizes.M}
                    onPress={() => props.onNavigate(props.budget, props.items)}
                >
                    See All
                </Text>
            </View>
        </View>
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