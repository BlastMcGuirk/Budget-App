import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from '../App';
import { useItem } from '../hooks/useItem';
import { Budget } from '../interfaces/Budget';
import { Item } from '../interfaces/Item';
import { FontSizes, Layouts } from '../styles/global';
import { DeleteItemDialog } from './DeleteItemDialog';
import ListItem from './ListItem';

export interface SpendingListProps {
    budget: Budget;
}

export default function SpendingList(props: SpendingListProps) {
    const { budget } = props;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    const { item, setItem, clearItem } = useItem();

    const navToBudget = () => navigation.navigate("BudgetDetails", { budgetId: budget.id });
    const navToItem = (item: Item) => navigation.navigate("ItemDetails", { budgetId: budget.id, itemId: item.id });
    const navToNew = () => navigation.navigate("NewEntry", { budget, returnTo: "Home", returnProps: undefined })

    return (
        <>
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={Layouts.row}>
                    <Text 
                        style={FontSizes.L}
                        onPress={navToBudget}>{props.budget.name}</Text>
                    <Text
                        style={FontSizes.L}
                        onPress={navToNew}
                        >
                        + New
                    </Text>
                </View>
            </View>
            {budget.items.slice(-3).reverse().map((item, index) => {
                return <ListItem 
                    key={item.name + index}
                    item={item}
                    onPress={() => navToItem(item)}
                    onLongPress={() => setItem(item)} />
            })}
            <View style={styles.footer}>
                <Text
                    style={FontSizes.M}
                    onPress={navToBudget}
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