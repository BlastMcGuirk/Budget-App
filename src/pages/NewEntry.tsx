import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RootStackParamList } from '../App';
import { LabeledInput } from '../controls/LabeledInput';
import { FontSizes } from '../styles/global';
import { BudgetDetailsProps } from './BudgetDetails';

export interface NewEntryProps {
    budget: string;
    returnTo: 'Home' | 'BudgetDetails';
    returnProps: undefined | BudgetDetailsProps;
}

type Props = NativeStackScreenProps<RootStackParamList, 'NewEntry'>;

export default function NewEntry(props: Props) {
    const { budget, returnTo, returnProps } = props.route.params;

    // The name for the entry
    const [name, setName] = useState('');

    // The amount for the entry
    const [amount, setAmount] = useState('');

    // Optional category for the entry
    const [category, setCategory] = useState('');

    // The date for the entry
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const date = dd + '/' + mm;

    return (
        <View style={styles.container}>
            <Text style={[styles.header, FontSizes.L]}>Add to: {budget}</Text>
            <LabeledInput label='Name*' placeholder='Name' value={name} setValue={setName} />
            <LabeledInput label='Amount*' placeholder='0.00' value={amount} setValue={setAmount} number />
            <LabeledInput label='Category' placeholder='Category' value={category} setValue={setCategory} />
            <Button title='Save' onPress={() => {
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
    },
    new: {
        borderTopWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    stringInput: {
        borderBottomWidth: 1,
        width: '90%'
    }
});