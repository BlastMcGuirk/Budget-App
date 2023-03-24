import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RootStackParamList } from '../App';
import { LabeledInput } from '../controls/LabeledInput';
import { useAppDispatch } from '../redux/store';
import { FontSizes } from '../styles/global';
import { Budget } from '../interfaces/Budget';
import { useDialogContext } from '../hooks/useDialogContext';
import { updateExistingBudget } from '../redux/features/actions/budgets';

export interface EditBudgetProps {
    budget: Budget;
}

type Props = NativeStackScreenProps<RootStackParamList, 'EditBudget'>;

export default function EditBudget(props: Props) {
    const { budget } = props.route.params;
    const dispatch = useAppDispatch();

    const dialogContext = useDialogContext<Budget>();

    React.useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => 
                <Icon style={[FontSizes.L]} name='delete' onPress={() => dialogContext.setContext(budget)} />
        })
    }, []);

    // The name for the budget
    const [name, setName] = useState(budget.name);
    const nameError = useMemo<string | undefined>(() => {
        if (name.length === 0) return 'Must enter a name';
        if (name.length > 10) return 'Name too long';
        return undefined;
    }, [name]);

    // The value for the budget
    const [amount, setAmount] = useState(budget.budgetValue.toString());
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

    return (
        <View style={styles.container}>
            <Text style={[styles.header, FontSizes.L]}>Edit Budget</Text>
            <LabeledInput label='Name*' placeholder='Name' value={name} setValue={setName} error={nameError} />
            <LabeledInput label='Amount*' placeholder='0.00' value={amount} setValue={setAmount} error={amountError} number />
            <Button title='Save' disabled={!!(nameError || amountError)} onPress={async () => {
                // Save the item to the database and store
                await dispatch(updateExistingBudget({
                    ...budget,
                    name: name,
                    budgetValue: parseFloat(amount)
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