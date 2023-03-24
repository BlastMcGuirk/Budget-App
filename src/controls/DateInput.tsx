import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import { FontSizes } from '../styles/global';

export interface DateInputProps {
    label: string;
    date: Date;
    setDate: (newDate: Date) => void;
}

export function DateInput(props: DateInputProps) {
    const [datePickerShowing, setDatePickerShowing] = useState(false);
    
    const displayValue = props.date.toLocaleDateString();

    return (
        <>
        <TouchableWithoutFeedback onPress={() => setDatePickerShowing(true)}>
            <View style={styles.container}>
                <TextInput
                    style={[styles.input, FontSizes.L]}
                    value={displayValue}
                    editable={false} />
                <Text style={[styles.label, FontSizes.S]}>
                    {props.label}
                </Text>
            </View>
        </TouchableWithoutFeedback>
        {datePickerShowing && <DatePicker
                value={props.date} 
                onChange={(_event, newDate) => {
                    setDatePickerShowing(false);
                    if (newDate) props.setDate(newDate);
                }} 
                maximumDate={new Date()} />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        width: '100%'
    },
    input: {
        borderBottomWidth: 1,
        color: '#000'
    },
    errorInput: {
        borderBottomWidth: 2,
        borderBottomColor: '#F00'
    },
    label: {
        color: '#999'
    },
    errorLabel: {
        color: '#F00'
    }
});