import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from '../App';
import BudgetSummary from '../components/BudgetSummary';
import ListItem from '../components/ListItem';
import { Item } from '../interfaces/Item';
import { FontSizes } from '../styles/global';

export interface BudgetDetailsProps {
    budget: string;
    items: Item[];
}

type Props = NativeStackScreenProps<RootStackParamList, 'BudgetDetails'>;

export default function BudgetDetails(props: Props) {
    const { budget, items } = props.route.params;
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/*<Text style={[FontSizes.XL, styles.title]}>{budget}</Text>*/}
            <View style={styles.header}>
                <BudgetSummary budget={budget} remaining={1234.56} total={1500} />
                <Text
                    style={[styles.new, FontSizes.S]}
                    onPress={() => console.log("Hello")}
                >
                    New Entry...
                </Text>
            </View>
            {items.map(item => {
                return <ListItem key={item.id} item={item}/>
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    header: {
        borderBottomWidth: 2,
        width: '100%',
    },
    new: {
        borderTopWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 8
    }
});