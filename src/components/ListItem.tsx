import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Item } from '../database/db-table-item';
import { FontSizes, Layouts } from '../styles/global';

export interface ListItemProps {
    item: Item
}

export default function ListItem(props: ListItemProps) {
    const { name, amount, month, day, category } = props.item;
    return (
        <View style={styles.container}>
            <View style={Layouts.row}>
                <Text style={FontSizes.L}>{name}</Text>
                <Text style={FontSizes.L}>${amount.toFixed(2)}</Text>
            </View>
            <View style={Layouts.row}>
                <Text style={FontSizes.S}>{category}</Text>
                <Text style={FontSizes.S}>{month}/{day}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: '100%'
    },
})