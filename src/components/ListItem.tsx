import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontSizes, Layouts } from '../styles/global';

export interface Item {
    name: string;
    amount: number;
    date: string;
    category?: string;
}

export interface ListItemProps {
    item: Item
}

export default function ListItem(props: ListItemProps) {
    const { name, amount, date, category } = props.item;
    return (
        <View style={styles.container}>
            <View style={Layouts.row}>
                <Text style={FontSizes.L}>{name}</Text>
                <Text style={FontSizes.L}>{amount}</Text>
            </View>
            <View style={Layouts.row}>
                <Text style={FontSizes.S}>{category}</Text>
                <Text style={FontSizes.S}>{date}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
})