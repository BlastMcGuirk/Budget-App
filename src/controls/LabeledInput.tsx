import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FontSizes } from '../styles/global';

export interface LabeledInputProps {
    label: string;
    placeholder: string;
    value: string,
    setValue: (value: string) => void;
    number?: boolean;
}

export function LabeledInput(props: LabeledInputProps) {
    const displayValue = (props.number && props.value !== '') ?
        "$" + props.value : props.value;
    return (
        <View style={[styles.container]}>
            <TextInput
                style={[styles.input, FontSizes.L]}
                value={displayValue}
                onChangeText={(text) => {
                    text = text.split('$').join('')
                    props.setValue(text);
                }}
                placeholder={props.placeholder}
                keyboardType={props.number ? "number-pad" : "default"} />
            <Text style={[styles.label, FontSizes.S]}>{props.label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        width: '100%'
    },
    input: {
        borderBottomWidth: 1
    },
    label: {
        color: '#999'
    }
});