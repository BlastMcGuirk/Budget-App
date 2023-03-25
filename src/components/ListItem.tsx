import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Item } from '../interfaces/Item';
import { FontSizes, Layouts } from '../styles/global';

export interface ListItemProps {
    item: Item
    onPress: () => void;
    onLongPress: () => void;
}

export function ListItem(props: ListItemProps) {
    const { id, name, amount, month, day, category } = props.item;
    const categoryValue = category !== 'null' ? category : '';
    return (
        <TouchableWithoutFeedback
            onPress={props.onPress}
            onLongPress={props.onLongPress}>
            <View key={id} style={styles.container} >
                <View style={Layouts.row}>
                    <Text style={FontSizes.L}>{name}</Text>
                    <Text style={FontSizes.L}>${amount.toFixed(2)}</Text>
                </View>
                <View style={Layouts.row}>
                    <Text style={FontSizes.S}>{categoryValue}</Text>
                    <Text style={FontSizes.S}>{month}/{day}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
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