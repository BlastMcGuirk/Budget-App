import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RootStackParamList } from '../App';
import { LabeledInput } from '../controls/LabeledInput';
import { Budget } from '../interfaces/Budget';
import { addNewItem } from '../redux/features/budget-slice';
import { useAppDispatch } from '../redux/store';
import { FontSizes } from '../styles/global';
import { BudgetDetailsProps } from './BudgetDetails';
import { DateInput } from '../controls/DateInput';

export interface NewEntryProps {
    budget: Budget;
    returnTo: 'Home' | 'BudgetDetails';
    returnProps: undefined | BudgetDetailsProps;
}

type Props = NativeStackScreenProps<RootStackParamList, 'NewEntry'>;

export default function NewEntry(props: Props) {
    const { budget, returnTo, returnProps } = props.route.params;
    const dispatch = useAppDispatch();

    // The name for the entry
    const [name, setName] = useState('');
    const nameError = useMemo<string | undefined>(() => {
        if (name.length === 0) return 'Must enter a name';
        if (name.length > 10) return 'Name too long';
        return undefined;
    }, [name]);

    // The amount for the entry
    const [amount, setAmount] = useState('');
    const amountError = useMemo<string | undefined>(() => {
        if (amount.length === 0) return 'Must enter an amount';
        if (amount.indexOf(',') > -1) return 'Invalid character (,)';
        if (amount.indexOf('-', 1) > 0) return 'Invalid character after first position (-)';
        if (amount.indexOf(' ') > -1) return 'Invalid character (_)';
        const amounts = amount.split('.');
        if (amounts.length > 2) return 'Too many decimals';
        if (amounts.length > 1 && amounts[1].length > 2) return 'Too many digits';
        return undefined;
    }, [amount]);

    // Optional category for the entry
    const [category, setCategory] = useState('');

    // The date for the entry
    const [date, setDate] = useState(new Date());

    return (
        <View style={styles.container}>
            <Text style={[styles.header, FontSizes.L]}>Add to: {budget.name}</Text>
            <LabeledInput label='Name*' placeholder='Name' value={name} setValue={setName} error={nameError} />
            <LabeledInput label='Amount*' placeholder='0.00' value={amount} setValue={setAmount} error={amountError} number />
            <LabeledInput label='Category' placeholder='Category' value={category} setValue={setCategory} />
            <DateInput label='Date' date={date} setDate={setDate} />
            <Button title='Save' disabled={!!(nameError || amountError)} onPress={() => {
                // Extract information from state
                const dd = String(date.getDate()).padStart(2, '0');
                const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
                const yyyy = String(date.getFullYear());

                // Save the item to the database and store
                dispatch(addNewItem({
                    budgetId: budget.id,
                    itemName: name,
                    amount: parseFloat(amount),
                    day: dd,
                    month: mm,
                    year: yyyy,
                    category: category || undefined
                }));
                if (returnTo == 'Home') props.navigation.navigate('Home');
                else props.navigation.navigate('BudgetDetails', returnProps as BudgetDetailsProps)
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