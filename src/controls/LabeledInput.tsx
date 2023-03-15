import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FontSizes } from '../styles/global';

export interface LabeledInputProps {
    label: string;
    placeholder: string;
    value: string,
    setValue: (value: string) => void;
    error?: string;
    number?: boolean;
}

export function LabeledInput(props: LabeledInputProps) {
    const displayValue = (props.number && props.value !== '') ?
        "$" + props.value : props.value;
    return (
        <View style={[styles.container]}>
            <TextInput
                style={[props.error ? styles.errorInput : styles.input, FontSizes.L]}
                value={displayValue}
                onChangeText={(text) => {
                    text = text.split('$').join('')
                    props.setValue(text);
                }}
                placeholder={props.placeholder}
                keyboardType={props.number ? "number-pad" : "default"} />
            <Text style={[props.error ? styles.errorLabel : styles.label, FontSizes.S]}>
                {props.error ?? props.label}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        width: '100%'
    },
    input: {
        borderBottomWidth: 1,
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