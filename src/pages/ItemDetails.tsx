import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../App';
import { FontSizes } from '../styles/global';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { useIsFocused } from '@react-navigation/native';

export interface ItemDetailsProps {
    budgetId: number;
    itemId: number;
}

type Props = NativeStackScreenProps<RootStackParamList, 'ItemDetails'>;

export function ItemDetails(props: Props) {
    const dispatch = useAppDispatch();
    const { budgetId, itemId } = props.route.params;
    const budgets = useSelector((state: RootState) => state.budgets.budgets);
    const isInFocus = useIsFocused();

    const { budget, item } = useMemo(() => {
        const budget = budgets.find(b => b.id === budgetId)!;
        const item = budget.items.find(i => i.id === itemId)!;
        return { budget, item };
    }, [budgetId, itemId, isInFocus]);


    React.useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => 
                <Icon style={[FontSizes.L]} name='edit' onPress={() => {props.navigation.navigate('EditItem', { item })}} />
        })
    }, [item]);

    const date = item.month + "/" + item.day + "/" + item.year;
    const categoryValue = item.category !== 'null' ? item.category : '';

    return (
        <View style={styles.container}>
            <Text style={[styles.header, FontSizes.XL]}>{item.name}</Text>
            <Text style={[FontSizes.S]}>{date}</Text>
            <Text style={[styles.topMargin, FontSizes.M]}>Amount: ${item.amount}</Text>
            <Text style={[styles.topMargin, FontSizes.M]}>Budget: {budget.name}</Text>
            {categoryValue && <Text style={[styles.topMargin, FontSizes.M]}>Category: {categoryValue}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20
    },
    header: {
        marginBottom: 10
    },
    topMargin: {
        marginTop: 40
    }
});
