import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from "react-redux";
import { nextMonth, prevMonth } from "../redux/features/budget-slice";
import { RootState, useAppDispatch } from "../redux/store";
import { FontSizes } from "../styles/global";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const DateNavigator = () => {
    const { month, year } = useSelector((state: RootState) => state.budgets);
    const dispatch = useAppDispatch();

    return (
        <View style={styles.container}>
            <Icon style={[FontSizes.XL]} name='navigate-before' onPress={() => dispatch(prevMonth())} />
            <Text style={[FontSizes.S]}>{months[month - 1] + " " + year}</Text>
            <Icon style={[FontSizes.XL]} name='navigate-next' onPress={() => dispatch(nextMonth())} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 2,
        borderBottomWidth: 2
    }
});