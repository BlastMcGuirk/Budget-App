import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontSizes } from '../styles/global';
import ListItem, { Item } from './ListItem';

export interface SpendingListProps {
    budget: string;
    items: Item[];
}

export default function SpendingList(props: SpendingListProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={FontSizes.L}>{props.budget}</Text>
            </View>
            {props.items.map((item, index) => {
                return <ListItem key={item.name + index} item={item}/>
            })}
            <View style={styles.footer}>
                <Text style={FontSizes.S}>New Entry...</Text>
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