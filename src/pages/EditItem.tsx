import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RootStackParamList } from '../App';
import { LabeledInput } from '../controls/LabeledInput';
import { updateExistingItem } from '../redux/features/budget-slice';
import { useAppDispatch } from '../redux/store';
import { FontSizes } from '../styles/global';
import { DateInput } from '../controls/DateInput';
import { Item } from '../interfaces/Item';

export interface EditItemProps {
    item: Item;
}

type Props = NativeStackScreenProps<RootStackParamList, 'EditItem'>;

export default function EditItem(props: Props) {
    const { item } = props.route.params;
    const dispatch = useAppDispatch();

    // The name for the entry
    const [name, setName] = useState(item.name);
    const nameError = useMemo<string | undefined>(() => {
        if (name.length === 0) return 'Must enter a name';
        if (name.length > 10) return 'Name too long';
        return undefined;
    }, [name]);

    // The amount for the entry
    const [amount, setAmount] = useState(item.amount.toString());
    const amountError = useMemo<string | undefined>(() => {
        if (amount.length === 0) return 'Must enter an amount';
        if (amount.indexOf(',') > -1) return 'Invalid character (,)';
        if (amount.indexOf('-') > -1) return 'Invalid character (-)';
        if (amount.indexOf(' ') > -1) return 'Invalid character (_)';
        const amounts = amount.split('.');
        if (amounts.length > 2) return 'Too many decimals';
        if (amounts.length > 1 && amounts[1].length > 2) return 'Too many digits';
        return undefined;
    }, [amount]);

    // Optional category for the entry
    const [category, setCategory] = useState(item.category ?? '');

    // The date for the entry
    const [date, setDate] = useState(new Date());

    return (
        <View style={styles.container}>
            <Text style={[styles.header, FontSizes.L]}>Edit Item</Text>
            <LabeledInput label='Name*' placeholder='Name' value={name} setValue={setName} error={nameError} />
            <LabeledInput label='Amount*' placeholder='0.00' value={amount} setValue={setAmount} error={amountError} number />
            <LabeledInput label='Category' placeholder='Category' value={category} setValue={setCategory} />
            <DateInput label='Date' date={date} setDate={setDate} />
            <Button title='Save' disabled={!!(nameError || amountError)} onPress={async () => {
                // Extract information from state
                const dd = String(date.getDate()).padStart(2, '0');
                const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
                const yyyy = String(date.getFullYear());

                // Save the item to the database and store
                await dispatch(updateExistingItem({
                    ...item,
                    budgetId: item.budgetId,
                    name: name,
                    amount: parseFloat(amount),
                    day: dd,
                    month: mm,
                    year: yyyy,
                    category: category || undefined
                }));                
                props.navigation.goBack();
            }} />
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
        marginBottom: 20
    }
});